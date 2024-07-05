const { Telegraf } = require('telegraf')
const axios = require('axios')
const schedule = require('node-schedule')
const fs = require('fs')
const yaml = require('js-yaml')
const translations = require('./translations.js')

// Load config from config.yaml
const config = yaml.load(fs.readFileSync('./config.yaml', 'utf8'))

const bot = new Telegraf(config.botToken)
let jobScheduled = false // Variable to track if the job is already scheduled
const lang = config.language || 'en' // Default to English if no language is set
const t = translations[lang] // Get translations for the chosen language

// Function to get the latest blood sugar value from Nightscout in mmol/L or mg/dL
async function getLastBloodSugar() {
	try {
		console.log('Getting data from Nightscout...')
		const response = await axios.get(
			`${config.nightscoutUrl}/api/v1/entries.json?count=1`
		)
		const lastEntry = response.data[0]
		let value
		if (config.units === 'mg/dL') {
			value = lastEntry.sgv // Use mg/dL value directly
		} else {
			value = (lastEntry.sgv / 18).toFixed(1) // Convert from mg/dL to mmol/L and round to 1 decimal place
		}
		return t.lastBloodSugar[config.units].replace('{value}', value)
	} catch (error) {
		console.error(t.errorGettingData, error)
		return t.errorGettingData
	}
}

// Function to send message to specified chats
async function sendMessageToChats(message) {
	for (const chatId of config.chatIds) {
		try {
			console.log(`Sending message to chat ${chatId}...`)
			await bot.telegram.sendMessage(chatId, message)
			console.log(`Message sent to chat ${chatId}`)
		} catch (error) {
			console.error(`${t.errorSendingMessage} ${chatId}:`, error)
		}
	}
}

// Handle /start command and start the hourly message sending process
bot.start(async ctx => {
	console.log(`/start command issued by user ${ctx.chat.id}`)
	ctx.reply(t.startCommand)

	if (!jobScheduled) {
		jobScheduled = true
		const message = await getLastBloodSugar()
		await sendMessageToChats(message)

		// Schedule job to run every hour
		schedule.scheduleJob('0 * * * *', async () => {
			const message = await getLastBloodSugar()
			console.log(t.hourlyUpdate)
			await sendMessageToChats(message)
		})

		console.log(t.scheduleJobStarted)
	} else {
		console.log(t.jobAlreadyStarted)
	}
})

// Handle /sugar command to get the latest blood sugar value
bot.command('sugar', async ctx => {
	if (config.chatIds.includes(ctx.chat.id.toString())) {
		const message = await getLastBloodSugar()
		ctx.reply(message)
	} else {
		ctx.reply(t.notAuthorized)
	}
})

bot
	.launch()
	.then(() => {
		console.log('Bot started')
	})
	.catch(error => {
		console.error('Error starting the bot:', error)
	})

bot.help(ctx => ctx.reply(t.helpMessage))

bot.on('text', ctx => ctx.reply(t.useStartCommand))
