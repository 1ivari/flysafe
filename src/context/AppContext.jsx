import { createContext, useState } from 'react'
import aircraftBasicInfo from '../data/aircraftBasicInfo'

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

	const [aircrafts, newAircraft] = useState(aircraftBasicInfo)

	const [aircraftId, setAircraftId] = useState(1)
	const handleAircraftChange = (e) => {
		setAircraftId(e.target.value)
		console.log('aircraft set')
	}

	return (
		<AppContext.Provider
			value={{
				basicData,
				setBasicData,
				wnb,
				setWnb,
				aircrafts,
				aircraftId,
				handleAircraftChange,
			}}>
			{children}
		</AppContext.Provider>
	)
}

export default AppContext
