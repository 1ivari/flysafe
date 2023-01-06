import { useContext } from 'react'
import AppContext from '../../context/AppContext'

// crypto.randomUUID()
function MetarList() {
  const { route } = useContext(AppContext)

  return (
    <>
      {route.map((obj, idx) => {
        return (
          <div
            key={obj.key}
            tabIndex={0}
            className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1'
          >
            <input type='checkbox' />
            <div className='collapse-title'>
              <div className='text-xl font-medium'>
                Airfield: {obj.geoJSON.properties.name}
              </div>
              <div className='text-sm'>{obj.geoJSON.properties.metars[0]}</div>
            </div>
            <div className='collapse-content'>
              <div className=''>Past 5 METAR</div>
              <ul>
                {obj.geoJSON.properties.metars.length > 0 ? (
                  obj.geoJSON.properties.metars.map((metar, i) => {
                    return (
                      <li key={i} className='text-sm'>
                        {metar}
                      </li>
                    )
                  })
                ) : (
                  <li>No Metars available for this airfield.</li>
                )}
              </ul>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default MetarList
