const schedule = require('node-schedule')
const nightscoutService = require('./nightscoutService')
const messageService = require('./messageService')

let jobScheduled = false

async function startJob() {
	if (!jobScheduled) {
		jobScheduled = true
		await sendBloodSugarUpdate()
		schedule.scheduleJob('0 * * * *', sendBloodSugarUpdate)
		console.log('Hourly update job started.')
	} else {
		console.log('The job has already been started.')
	}
}

async function sendBloodSugarUpdate() {
	try {
		const value = await nightscoutService.getLastBloodSugar()
		const message = messageService.formatBloodSugarMessage(value)
		await messageService.sendMessageToChats(message)
		console.log('Sent hourly blood sugar update.')
	} catch (error) {
		console.error('Error during scheduled update:', error)
	}
}

module.exports = {
	startJob,
}
