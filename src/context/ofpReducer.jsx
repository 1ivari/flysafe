import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import windCorrection from '../utils/windCorrection'

let OfpRow = {
	key: 0,
	poi: {},
	description: '',
	minAlt: '',
	planAlt: '',
	tas: 0,
	wind: 0,
	windSpeed: 0,
	tc: 0,
	wca: 0,
	th: 0,
	var: 0,
	mh: 0,
	dev: 0,
	ch: 0,
	distInt: 0,
	distAcc: 0,
	gs: 0,
	timeInt: {},
	timeAcc: {},
	eto: '',
	ato: '',
	fuelRem: '',
	remark: '',
}

export const initialState = []

const ofpReducer = (state, action) => {
	dayjs.extend(duration)
	const { type, payload } = action
	switch (type) {
		case 'ADD_DESCRIPTION':
			return {
				...state,
				description: payload,
			}

		case 'ADD_ROW':
			return [
				...state,
				{
					...OfpRow,
					key: payload.key,
					description: payload.description,
					distInt: payload.distInt,
					distAcc: payload.distAcc,
					var: payload.var,
					tc: payload.tc,
					tas: payload.tas,
					timeInt: payload.timeInt,
					timeAcc: payload.timeAcc,
				},
			]

		case 'CLEAR':
			return initialState

		case 'ADD_POI':
			return state.map((row, idx) => {
				if (payload.i === idx) {
					return { ...row, poi: payload.poi }
				} else {
					return row
				}
			})

		case 'CHANGE_ITEM':
			return state.map((item) =>
				payload.id === item.key
					? { ...item, [payload.name]: payload.value }
					: item
			)

		case 'RECALCULATE': {
			console.log('recalculated')
			let interval = dayjs.duration(0)
			let sum = dayjs.duration(0)
			let sumNum = Number(0)
			return state.map((obj) => {
				if (obj.key === payload.id) {
					// take wind ito account
					const { windCorrectionAngle, groundSpeed } = windCorrection(
						obj.tc,
						obj.tas,
						obj.wind,
						obj.windSpeed
					)
					const int = Math.ceil(obj.distInt) / Math.floor(groundSpeed)
					interval = dayjs.duration(int, 'hours')
					sumNum += int
					sum = dayjs.duration(sumNum, 'hours')

					const th = obj.tc + windCorrectionAngle
					const mh = th - obj.var
					return {
						...obj,
						timeInt: interval,
						timeAcc: sum,
						wca: windCorrectionAngle,
						gs: groundSpeed,
						th: th,
						mh: mh,
					}
				} else {
					if (obj.tas === 0) {
						return { ...obj }
					} else {
						sumNum += obj.distInt / obj.tas
						sum = dayjs.duration(sumNum, 'hours')
						return {
							...obj,
							timeAcc: sum,
						}
					}
				}
			})
		}

		case 'CHANGE_TAS': {
			let interval = dayjs.duration(0)
			let sum = dayjs.duration(0)
			let sumNum = Number(0)
			return state.map((obj) => {
				if (obj.key === payload.id) {
					// take wind ito account
					const { windCorrectionAngle, groundSpeed } = windCorrection(
						obj.tc,
						payload.value,
						obj.wind,
						obj.windSpeed
					)

					interval = dayjs.duration(obj.distInt / groundSpeed, 'hours')
					sumNum += obj.distInt / groundSpeed
					sum = dayjs.duration(sumNum, 'hours')
					return {
						...obj,
						tas: payload.value,
						timeInt: interval,
						timeAcc: sum,
						wca: windCorrectionAngle,
						gs: groundSpeed,
					}
				} else {
					if (obj.tas === 0) {
						return { ...obj }
					} else {
						sumNum += obj.distInt / obj.tas
						sum = dayjs.duration(sumNum, 'hours')
						return {
							...obj,
							timeAcc: sum,
						}
					}
				}
			})
		}

		default:
			return state
	}
}

export default ofpReducer
