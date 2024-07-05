const data = []

function addDataPoint(value) {
	if (data.length >= 12) {
		data.shift()
	}
	data.push(value)
}

function getDataPoints() {
	return data
}

module.exports = {
	addDataPoint,
	getDataPoints,
}
