let OfpRow = {
	key: 0,
	poi: {},
	description: '',
	minAlt: '',
	planAlt: '',
	tas: 0,
	wind: '',
	windSpeed: '',
	tc: '',
	wca: '',
	th: '',
	var: '',
	mh: '',
	dev: '',
	ch: '',
	distInt: 0,
	distAcc: 0,
	gs: '',
	timeInt: {},
	timeAcc: {},
	eto: '',
	ato: '',
	fuelRem: '',
	remark: '',
}

export const initialState = []

const ofpReducer = (state, action) => {
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
			return state.map((item, idx) =>
				payload.i === idx ? { ...item, [payload.name]: payload.value } : item
			)

		default:
			return state
	}
}

export default ofpReducer
