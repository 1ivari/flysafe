import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import windCorrection from '../utils/windCorrection'
import distance from '@turf/distance'
import bearing from '@turf/bearing'
import * as geomag from 'geomag'
dayjs.extend(duration)

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
	timeInt: dayjs.duration(0, 'hours'),
	timeAcc: dayjs.duration(0, 'hours'),
	eto: '',
	ato: '',
	fuelRem: '',
	remark: '',
}

export const initialState = []

const ofpReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'CLEAR':
			return initialState

		case 'CHANGE_ITEM':
			return state.map((item) =>
				payload.id === item.key
					? { ...item, [payload.name]: payload.value }
					: item
			)

		case 'RECALCULATE': {
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

		case 'ADD_DEPARTURE': {
			return [
				...state,
				{
					...OfpRow,
					key: payload.key,
					description: 'DEP => ' + payload.ident,
				},
			]
		}

		case 'ADD_LEG': {
			return [
				...state,
				{
					...OfpRow,
					key: payload.key,
				},
			]
		}

		case 'DELETE_LEG': {
			return state.filter((item) => item.key !== payload.id)
		}

		case 'CONSTRUCT_FROM_ROUTE':
			{
				const route = payload.obj
				let sumDistance = 0
				if (route.length > 0) {
					return route.map((poi, i, arr) => {
						const properties = poi.geoJSON.properties
						const desc =
							i > 0
								? arr[i - 1].geoJSON.properties.ident +
								  ' -> ' +
								  properties.ident
								: 'DEP: ' + properties.ident

						const dist =
							i > 0
								? Number(
										distance(arr[i - 1].geoJSON, poi.geoJSON, {
											units: 'nauticalmiles',
										})
								  )
								: Number(0)
						sumDistance += dist
						// take the starting point declination as in Marilyn
						const loc =
							i > 0
								? arr[i - 1].geoJSON.geometry.coordinates
								: poi.geoJSON.geometry.coordinates
						const magVar = geomag.field(loc[1], loc[0])

						const trueCourse180 =
							i > 0
								? Number(
										bearing(arr[i - 1].geoJSON.geometry, poi.geoJSON.geometry)
								  )
								: Number(0)

						const trueCourse360 =
							trueCourse180 < 0 ? trueCourse180 + 360 : trueCourse180

						const tas = 90

						const time = dayjs.duration(dist / tas, 'hours')
						const timeAcc = dayjs.duration(sumDistance / tas, 'hours')
						return {
							...OfpRow,
							key: poi.key,
							description: desc,
							distInt: dist,
							distAcc: sumDistance,
							var: magVar.declination,
							tc: trueCourse360,
							tas: tas,
							timeInt: time,
							timeAcc: timeAcc,
							wind: 0,
							windSpeed: 0,
							wca: 0,
							gs: 0,
						}
					})
				}
			}

			break
		default:
			return state
	}
}

export default ofpReducer
