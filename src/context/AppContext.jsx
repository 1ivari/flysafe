import { createContext, useState, useReducer } from 'react'
import aircraftBasicInfo from '../data/aircraftBasicInfo'
import ofpReducer from './ofpReducer'
import { initialState } from './ofpReducer'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
	const [basicData, setBasicData] = useState({
		id: '',
		date: '',
		pob: '',
		crew: '',
		arrival: '',
		rules: 'vfr',
	})

	const [wnb, setWnb] = useState({
		seatWeight: 0,
		baggageWeight1: 0,
		baggageWeight2: 0,
		fuelWeight: 0,
	})

	const [route, setRoute] = useState([])
	const [metarData, setMetarData] = useState([])

	const [aircrafts, newAircraft] = useState(aircraftBasicInfo)

	const [aircraftId, setAircraftId] = useState(1)
	const handleAircraftChange = (e) => {
		setAircraftId(e.target.value)
		console.log('aircraft set')
	}

	// REDUCER FUNCTIONS

	const [ofpState, dispatch] = useReducer(ofpReducer, initialState)

	const addOfpRow = (id) => {
		dispatch({
			type: 'ADD_ROW',
			payload: id,
		})
	}

	const clearOfp = () => {
		dispatch({
			type: 'CLEAR',
		})
	}

	const addPoi = (poi, i) => {
		dispatch({
			type: 'ADD_POI',
			payload: { poi, i },
		})
	}

	const changeItem = (name, value, i) => {
		dispatch({
			type: 'CHANGE_ITEM',
			payload: { name, value, i },
		})
	}

	// MATH FUNCTIONS
	const haverSineDistance = (lon1, lat1, lon2, lat2) => {
		const R = 6371e3 // metres
		const phi1 = (lat1 * Math.PI) / 180 // φ, λ in radians
		const phi2 = (lat2 * Math.PI) / 180
		const deltaPhi = ((lat2 - lat1) * Math.PI) / 180
		const deltaLambda = ((lon2 - lon1) * Math.PI) / 180

		const a =
			Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
			Math.cos(phi1) *
				Math.cos(phi2) *
				Math.sin(deltaLambda / 2) *
				Math.sin(deltaLambda / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

		return Math.round(R * c * 0.000539956803) // in NM
	}

	const calcTime = (spd, spdUnit, dist, distUnit, outFormat) => {
		let spd_ms = Number(0)
		let time_s = Number(0)
		let dist_m = Number(0)
		switch (spdUnit) {
			case 'kt':
				spd_ms = 0.5144444 * spd
				console.log(`spd m/s: ${spd_ms}`)
				break
			default:
				spd_ms = spd
		}

		switch (distUnit) {
			case 'nm':
				dist_m = 1852 * dist
				console.log(`dist_m: ${dist_m}`)
				break
			default:
				dist_m = dist
		}

		time_s = dist_m / spd_ms
		console.log(`time_s:${time_s}`)

		switch (outFormat) {
			case 'min':
				return Math.round(time_s / 60)
				break

			default:
				return Math.round(time_s)
		}
	}
	return (
		<AppContext.Provider
			value={{
				basicData,
				setBasicData,
				wnb,
				setWnb,
				route,
				setRoute,
				metarData,
				setMetarData,
				aircrafts,
				aircraftId,
				handleAircraftChange,
				ofpState,
				addOfpRow,
				clearOfp,
				addPoi,
				changeItem,
				haverSineDistance,
				calcTime,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
