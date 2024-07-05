const data = [5.6, 10.2, 21.2, 4.5]

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
