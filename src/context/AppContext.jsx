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
  const [geoJSONRoute, setGeoJSONRoute] = useState([])
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

  return (
    <AppContext.Provider
      value={{
        basicData,
        setBasicData,
        wnb,
        setWnb,
        route,
        setRoute,
        geoJSONRoute,
        setGeoJSONRoute,
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
