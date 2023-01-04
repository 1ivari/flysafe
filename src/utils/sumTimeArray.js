const sumTimeArray = (timeArray) => {
	const cumulativeSum = (
		(sum) => (value) =>
			(sum += value)
	)(0)

	const timeArrayRaw = timeArray.map((time) => time.timeRaw)
	const sumTimeRaw = timeArrayRaw.map(cumulativeSum)
	const sumTimeRaw2 = timeArrayRaw.map(cumulativeSum)
	console.log('moro', sumTimeRaw2)

	const returnObjArray = []

	sumTimeRaw.map((timeRaw) => {
		const returnObj = {
			timeRaw: Number(0),
			seconds: '0',
			minutes: '0',
			hours: '0',
			hhmm: '00:00',
		}

		returnObj.timeRaw = timeRaw

		returnObj.hours =
			Math.floor(timeRaw) > 9
				? Math.floor(timeRaw).toString()
				: '0' + Math.floor(timeRaw).toString()
		let mins = (timeRaw - Math.floor(timeRaw)) * 60
		returnObj.minutes =
			Math.floor(mins) > 9
				? Math.floor(mins).toString()
				: '0' + Math.floor(mins).toString()
		let secs = (mins - Math.floor(mins)) * 60
		returnObj.seconds = Math.round(secs)

		returnObj.hhmm = returnObj.hours + ':' + returnObj.minutes

		// console.log('returnObj', returnObj)
		returnObjArray.push(returnObj)
		// console.log('returnObjArr', returnObjArray)
	})

	return returnObjArray
}

export default sumTimeArray
