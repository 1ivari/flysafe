import { useContext } from 'react'
import AppContext from '../context/AppContext.jsx'

function AircraftSelector() {
  const { aircrafts, handleAircraftChange } = useContext(AppContext)
  return (
    <>
      <select
        onChange={handleAircraftChange}
        className='select w-full max-w-xs'
      >
        {aircrafts.map((aircraft) => {
          return <option value={aircraft.id}>{aircraft.name}</option>
        })}
      </select>
    </>
  )
}

export default AircraftSelector
