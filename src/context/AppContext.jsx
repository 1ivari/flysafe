import { createContext, useState, useReducer, useEffect } from 'react'
import { useSessionStorage, useLocalStorage } from '../hooks/useStorage'
import aircraftBasicInfo from '../data/aircraftBasicInfo'
import { ofpReducer, initializer } from './ofpReducer'

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

  // const [route, setRoute] = useState([])
  const [route, setRoute] = useLocalStorage('route', [])
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

  const [drawerOpen, setDrawerOpen] = useState(false)

  const [ofpLock, setOfpLock] = useState(false)

  // REDUCER FUNCTIONS

  const [ofp, dispatch] = useReducer(ofpReducer, [], initializer)

  useEffect(() => {
    localStorage.setItem('localOfp', JSON.stringify(ofp))
  }, [ofp])

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
        ofpLock,
        setOfpLock,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
