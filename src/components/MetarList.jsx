import { useContext } from 'react'
import AppContext from '../context/AppContext'

// crypto.randomUUID()
function MetarList() {
  const { metarData } = useContext(AppContext)

  return (
    <>
      {metarData.map((obj, idx) => {
        return (
          <div key={obj.key} className='text-white'>
            <h1>Airfield: {obj.ident}</h1>
            <ul>
              {obj.metars.length > 0 ? (
                obj.metars.map((metar, i) => {
                  return (
                    <li key={i} className='text-white'>
                      {metar}
                    </li>
                  )
                })
              ) : (
                <li>No Metars available for this airfield.</li>
              )}
            </ul>
            <div>---</div>
          </div>
        )
      })}
    </>
  )
}

export default MetarList
