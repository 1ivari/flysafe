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
		defaultTas: 0,
	})

	const [wnb, setWnb] = useState({
		seatWeight: 0,
		baggageWeight1: 0,
		baggageWeight2: 0,
		fuelWeight: 0,
	})

	const [route, setRoute] = useState([])
	const [map, setMap] = useState(null)
	const [mapSettings, setMapSettings] = useState({
		projection: 'globe',
		zoom: 1,
	})
	const [metarData, setMetarData] = useState([])

	const [aircrafts, newAircraft] = useState(aircraftBasicInfo)

	const [aircraftId, setAircraftId] = useState(1)
	const handleAircraftChange = (e) => {
		setAircraftId(e.target.value)
		console.log('aircraft set')
	}

	// REDUCER FUNCTIONS

	const [ofp, dispatch] = useReducer(ofpReducer, [])

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

	const changeTas = (key, value) => {
		dispatch({
			type: 'CHANGE_TAS',
			payload: { key, value },
		})
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
				map,
				setMap,
				mapSettings,
				setMapSettings,
				metarData,
				setMetarData,
				aircrafts,
				aircraftId,
				handleAircraftChange,
				ofp,
				dispatch,
				addOfpRow,
				clearOfp,
				addPoi,
				changeItem,
				changeTas,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
