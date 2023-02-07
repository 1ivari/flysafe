import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

// crypto.randomUUID()
function MetarList() {
  const { route } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <>
      {route.length === 0 ? (
        <div className='flex justify-center content-center'>
          <div className='card w-96 bg-base-100 shadow-xl'>
            <div className='card-body'>
              <h2 className='card-title'>Forgot to add route!</h2>
              <p>Please add route first so you can see the weather ⛅</p>
              <div className='card-actions justify-end'>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate('/route')}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        route
          .filter((item) => item.geoJSON.properties.type !== 'VFR REP')
          .map((obj, idx) => {
            return (
              <div
                key={obj.key}
                className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1'
              >
                <input type='checkbox' />
                <div className='collapse-title'>
                  <div className='text-xl font-medium'>
                    Airfield: {obj.geoJSON.properties.name}
                  </div>
                  <div className='text-sm'>
                    {obj.geoJSON.properties.metars[0]}
                  </div>
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
          })
      )}
    </>
  )
}

export default MetarList
