let OfpRow = {
	id: new Date().valueOf(),
	poi: {},
	description: '',
	minAlt: '',
	planAlt: '',
	tas: '',
	wind: '',
	windSpeed: '',
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
			return [...state, { ...OfpRow, id: new Date().valueOf() }]

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

		default:
			return state
	}
}

export default ofpReducer
