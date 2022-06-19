let OfpRow = {
	id: 0,
	poi: {},
	description: '',
	minAlt: '',
	planAlt: '',
	tas: '',
	wind: '',
	windSpeed: '',
	wca: '',
	th: '',
	var: '',
	mh: '',
	dev: '',
	ch: '',
	distInt: '',
	distAcc: '',
	gs: '',
	timeInt: '',
	timeAcc: '',
	eto: '',
	ato: '',
	fuelRem: '',
	remark: '',
}

export const initialState = [OfpRow]

const ofpReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case 'ADD_DESCRIPTION':
			return {
				...state,
				description: payload,
			}

		case 'ADD_ROW':
			return [...state, { ...OfpRow, id: payload }]

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
