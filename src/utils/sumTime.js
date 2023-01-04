const sumTime = (time1, time2) => {
	const returnObj = {
		timeRaw: Number(0),
		seconds: '0',
		minutes: '0',
		hours: '0',
		hhmm: '00:00',
	}

	let sum = time1.timeRaw + time2.timeRaw

	let hrs = sum

	returnObj.hours =
		Math.floor(hrs) > 9
			? Math.floor(hrs).toString()
			: '0' + Math.floor(hrs).toString()
	let mins = (hrs - Math.floor(hrs)) * 60
	returnObj.minutes =
		Math.floor(mins) > 9
			? Math.floor(mins).toString()
			: '0' + Math.floor(mins).toString()
	let secs = (mins - Math.floor(mins)) * 60
	returnObj.seconds = Math.round(secs)

	returnObj.hhmm = returnObj.hours + ':' + returnObj.minutes
	returnObj.timeRaw = hrs

	return returnObj
}

export default sumTime
