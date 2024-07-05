const config = require('../config')
const translations = require('../translations')
const t = translations[config.language]

function formatBloodSugarMessage(value) {
	const unit = config.unit || 'mmol/L'

	if (!value || typeof value[unit] === 'undefined') {
		return t.errorGettingData
	}

	const roundedValue = value[unit].toFixed(1)
	return `${t.bloodSugarLevel}: ${roundedValue} ${unit}`
}

async function sendMessageToChats(bot, message) {
	for (const chatId of config.chatIds) {
		try {
			await bot.telegram.sendMessage(chatId, message)
		} catch (error) {
			console.error(`Failed to send message to chat ${chatId}:`, error)
		}
	}
}

module.exports = {
	formatBloodSugarMessage,
	sendMessageToChats,
}
