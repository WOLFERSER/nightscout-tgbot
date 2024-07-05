const { Telegraf, Markup } = require('telegraf')
const jobService = require('./services/jobService')
const nightscoutService = require('./services/nightscoutService')
const messageService = require('./services/messageService')
const dataService = require('./services/dataService')
const translations = require('./translations')
const config = require('./config')
const fs = require('fs')
const yaml = require('js-yaml')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas')

const bot = new Telegraf(config.botToken)
const t = translations[config.language]

const width = 800
const height = 400
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })

function saveConfig() {
	fs.writeFileSync('./config.yaml', yaml.dump(config), 'utf8')
}

const adminKeyboard = Markup.inlineKeyboard([
	[Markup.button.callback(t.addId || 'Add ID', 'add_id')],
	[Markup.button.callback(t.removeId || 'Remove ID', 'remove_id')],
	[Markup.button.callback(t.viewIds || 'View IDs', 'view_ids')],
	[
		Markup.button.callback(
			t.broadcastMessage || 'Broadcast Message',
			'broadcast_message'
		),
	],
])

bot.start(async ctx => {
	console.log(`/start command issued by user ${ctx.chat.id}`)
	ctx.reply(t.startCommand)
	await jobService.startJob(bot)
})

bot.command('sugar', async ctx => {
	if (config.chatIds.includes(ctx.chat.id.toString())) {
		try {
			const value = await nightscoutService.getLastBloodSugar()
			console.log(`Retrieved blood sugar value: ${value}`)
			const message = messageService.formatBloodSugarMessage(value)
			ctx.reply(message)
		} catch (error) {
			console.error('Error getting blood sugar data:', error)
			ctx.reply(t.errorGettingData)
		}
	} else {
		ctx.reply(t.notAuthorized)
	}
})

bot.command('admin', async ctx => {
	if (ctx.chat.id.toString() === config.adminId) {
		ctx.reply(t.adminPanel, adminKeyboard)
	} else {
		ctx.reply(t.notAuthorized)
	}
})

bot.command('graph', async ctx => {
	if (!config.chatIds.includes(ctx.chat.id.toString())) {
		ctx.reply(t.notAuthorized)
		return
	}

	const dataPoints = dataService.getDataPoints()

	if (dataPoints.length === 0) {
		ctx.reply(t.noDataPoints)
		return
	}

	console.log(`Data points for graph: ${dataPoints}`)

	const labels = dataPoints.map((_, index) => `${t.graph.hours} ${index + 1}`)
	const configuration = {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: t.graph.bloodSugarLevels,
					data: dataPoints,
					borderColor: 'rgba(75, 192, 192, 1)',
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					fill: false,
				},
			],
		},
		options: {
			responsive: false,
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: t.graph.hours,
					},
				},
				y: {
					display: true,
					title: {
						display: true,
						text: t.graph.bloodSugarLevels,
					},
				},
			},
		},
	}

	const buffer = await chartJSNodeCanvas.renderToBuffer(configuration)
	ctx.replyWithPhoto({ source: buffer })
})

let addIdMode = false
let removeIdMode = false
let broadcastMode = false

bot.on('callback_query', async ctx => {
	const callbackData = ctx.callbackQuery.data

	if (ctx.chat.id.toString() !== config.adminId) {
		return ctx.answerCbQuery(t.notAuthorized, { show_alert: true })
	}

	switch (callbackData) {
		case 'add_id':
			addIdMode = true
			removeIdMode = false
			broadcastMode = false
			ctx.reply(t.enterIdToAdd)
			break
		case 'remove_id':
			addIdMode = false
			removeIdMode = true
			broadcastMode = false
			ctx.reply(t.enterIdToRemove)
			break
		case 'view_ids':
			const ids = config.chatIds.map(id => `ID: ${id}`).join('\n')
			ctx.reply(t.listIds.replace('{ids}', ids))
			break
		case 'broadcast_message':
			addIdMode = false
			removeIdMode = false
			broadcastMode = true
			ctx.reply(t.enterMessageToBroadcast)
			break
		default:
			ctx.answerCbQuery()
			break
	}
})

bot.on('text', async ctx => {
	const text = ctx.message.text

	if (ctx.chat.id.toString() !== config.adminId) {
		return
	}

	if (addIdMode) {
		if (!config.chatIds.includes(text)) {
			config.chatIds.push(text)
			saveConfig()
			ctx.reply(t.idAdded.replace('{id}', text))
		} else {
			ctx.reply(t.idExists.replace('{id}', text))
		}
		addIdMode = false
	} else if (removeIdMode) {
		const index = config.chatIds.indexOf(text)
		if (index !== -1) {
			config.chatIds.splice(index, 1)
			saveConfig()
			ctx.reply(t.idRemoved.replace('{id}', text))
		} else {
			ctx.reply(t.idNotFound.replace('{id}', text))
		}
		removeIdMode = false
	} else if (broadcastMode) {
		await messageService.sendMessageToChats(bot, text)
		ctx.reply(t.messageSent)
		broadcastMode = false
	} else {
		ctx.reply(t.useStartCommand)
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

module.exports = { bot }
