const cron = require('node-cron')
const nightscoutService = require('./nightscoutService')
const dataService = require('./dataService')
const messageService = require('./messageService')

let job

function startJob(bot) {
	if (job) {
		console.log('Job already started.')
		return
	}

	job = cron.schedule('0 * * * *', async () => {
		console.log('Fetching and sending blood sugar updates...')
		try {
			const value = await nightscoutService.getLastBloodSugar()
			dataService.addDataPoint(value) // Добавляем новое показание в массив
			console.log(`Added data point in job: ${JSON.stringify(value)}`) // Логирование добавленного значения в задаче
			const message = messageService.formatBloodSugarMessage(value)
			await messageService.sendMessageToChats(bot, message)
		} catch (error) {
			console.error('Error fetching or sending blood sugar updates:', error)
		}
	})

	console.log('Hourly update job started.')
}

module.exports = {
	startJob,
}
