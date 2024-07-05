const { Telegraf } = require('telegraf')
const translations = require('../translations')
const config = require('../config')

const bot = new Telegraf(config.botToken)
const t = translations[config.language]

async function sendMessageToChats(message) {
	for (const chatId of config.chatIds) {
		try {
			await bot.telegram.sendMessage(chatId, message)
		} catch (error) {
			console.error(`Error sending message to chat ${chatId}:`, error)
		}
	}
}

function formatBloodSugarMessage(value) {
	return t.lastBloodSugar[config.units].replace('{value}', value)
}

module.exports = {
	sendMessageToChats,
	formatBloodSugarMessage,
}