import { createContext, useState } from 'react'
import aircraftBasicInfo from '../data/aircraftBasicInfo'

const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [aircrafts, newAircraft] = useState(aircraftBasicInfo)


  const [aircraftId, setAircraftId] = useState(1)
  const handleAircraftChange = (e) => {
    setAircraftId(e.target.value)
    console.log('aircraft set')
  }

  const [seatWeight, setSeatWeight] = useState(0)
  const handleSeatWeightChange = (e) => {
    setSeatWeight(e.target.value)
  }

  const [baggageWeight1, setBaggageWeight1] = useState(0)
  const handleBaggageWeight1Change = (e) => {
    setBaggageWeight1(e.target.value)
  }

  const [baggageWeight2, setBaggageWeight2] = useState(0)
  const handleBaggageWeight2Change = (e) => {
    setBaggageWeight2(e.target.value)
  }

  const [fuelWeight, setfuelWeight] = useState(0)
  const handlefuelWeightChange = (e) => {
    setfuelWeight(e.target.value)
  }

  return (
    <AppContext.Provider
      value={{
        aircrafts,
        aircraftId,
        handleAircraftChange,
        seatWeight,
        handleSeatWeightChange,
        baggageWeight1,
        handleBaggageWeight1Change,
        baggageWeight2,
        handleBaggageWeight2Change,
        fuelWeight,
        handlefuelWeightChange,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext
