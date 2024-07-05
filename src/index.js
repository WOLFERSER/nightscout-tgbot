const { Telegraf } = require('telegraf')
const jobService = require('./services/jobService')
const nightscoutService = require('./services/nightscoutService')
const messageService = require('./services/messageService')
const translations = require('./translations')
const config = require('./config')

const bot = new Telegraf(config.botToken)
const t = translations[config.language]

// Handle /start command and start the hourly message sending process
bot.start(async ctx => {
	console.log(`/start command issued by user ${ctx.chat.id}`)
	ctx.reply(t.startCommand)
	await jobService.startJob()
})

// Handle /sugar command to get the latest blood sugar value
bot.command('sugar', async ctx => {
	if (config.chatIds.includes(ctx.chat.id.toString())) {
		try {
			const value = await nightscoutService.getLastBloodSugar()
			const message = messageService.formatBloodSugarMessage(value)
			ctx.reply(message)
		} catch (error) {
			ctx.reply(t.errorGettingData)
		}
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
