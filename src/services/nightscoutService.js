const axios = require('axios')
const config = require('../config')

async function getLastBloodSugar() {
	const response = await axios.get(
		`${config.nightscoutUrl}/api/v1/entries.json?count=1`
	)
	if (response.data && response.data.length > 0) {
		const latestEntry = response.data[0]
		return {
			'mmol/L': latestEntry.sgv / 18.0182,
			'mg/dL': latestEntry.sgv,
		}
	} else {
		throw new Error('No data available')
	}
}

module.exports = {
	getLastBloodSugar,
}
