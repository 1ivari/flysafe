import { createContext, useState, useReducer } from 'react'
import aircraftBasicInfo from '../data/aircraftBasicInfo'
import ofpReducer from './ofpReducer'

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

  // Reducer functions
  const initialState = [
    {
      id: 0,
      poi: {},
      description: '',
      minAlt: '',
      planAlt: '',
      tas: '',
      wind: '',
      windSpeed: '',
    },
  ]

  const [ofpState, dispatch] = useReducer(ofpReducer, initialState)

  const addDescription = () => {
    dispatch({
      type: 'ADD_DESCRIPTION',
      payload: 'kuvaus välitetty reducerilla',
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
        metarData,
        setMetarData,
        aircrafts,
        aircraftId,
        handleAircraftChange,
        ofpState,
        addDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
