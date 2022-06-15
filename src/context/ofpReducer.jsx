const ofpReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_DESCRIPTION':
			return {
				...state,
				description: action.payload,
			}

		case 'ADD_ROW':
			return [...state, ofpRow]

		default:
			return state
	}
}

export default ofpReducer

const ofpRow = {
	id: 0,
	poi: {},
	description: '',
	minAlt: '',
	planAlt: '',
	tas: '',
	wind: '',
	windSpeed: '',
}
