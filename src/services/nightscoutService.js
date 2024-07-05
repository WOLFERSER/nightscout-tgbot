const axios = require('axios')
const config = require('../config')

async function getLastBloodSugar(units) {
	try {
		const response = await axios.get(
			`${config.nightscoutUrl}/api/v1/entries.json?count=1`
		)
		const lastEntry = response.data[0]
		let value
		if (units === 'mg/dL') {
			value = lastEntry.sgv
		} else {
			value = (lastEntry.sgv / 18).toFixed(1)
		}
		return value
	} catch (error) {
		console.error('Failed to get data from Nightscout:', error)
		throw new Error('Failed to get data from Nightscout')
	}
}

module.exports = {
	getLastBloodSugar,
}
