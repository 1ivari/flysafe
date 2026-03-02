import { useLocation, useNavigate } from 'react-router-dom'

function ProgressSteps({ activePage }) {
  const navigate = useNavigate()
  let location = useLocation()
  return (
    <>
      <div
        id='progressSteps'
        className='hidden lg:flex justify-center items-center text-xs my-2'
      >
        {location.pathname !== '/basicdata' ? (
          <button
            className='btn'
            onClick={() => {
              const path = location.pathname
              switch (path) {
                case '/route':
                  navigate('/basicdata')
                  break
                case '/weather':
                  navigate('/route')
                  break
                case '/ofp':
                  navigate('/weather')
                  break
                default:
                  break
              }
            }}
          >
            👈
          </button>
        ) : (
          <button className='btn' onClick={() => navigate('/')}>
            🏠
          </button>
        )}
        <ul className='steps'>
          <li
            className={
              activePage > 0
                ? 'step step-primary cursor-pointer'
                : 'grid step cursor-pointer'
            }
            onClick={() => navigate('/basicdata')}
          >
            Basic data
          </li>

          <li
            className={
              activePage > 1
                ? 'step step-primary cursor-pointer'
                : 'grid step cursor-pointer'
            }
            onClick={() => navigate('/route')}
          >
            Route
          </li>

          <li
            className={
              activePage > 2
                ? 'step step-primary cursor-pointer'
                : 'grid step cursor-pointer'
            }
            onClick={() => navigate('/weather')}
          >
            Weather
          </li>

          <li
            className={
              activePage > 3
                ? 'step step-primary cursor-pointer'
                : 'grid step cursor-pointer'
            }
            onClick={() => navigate('/ofp')}
          >
            OFP
          </li>

          {/* <li
              className={
                activePage > 4
                  ? 'step step-primary cursor-pointer'
                  : 'grid step cursor-pointer'
              }
              onClick={() => navigate('/submit')}
            >
              Print
            </li> */}

          {/* <li
              className={
                activePage > 4
                  ? 'step step-primary cursor-pointer'
                  : 'grid step cursor-pointer'
              }
              onClick={() => navigate('/wnb')}
            >
              Weight and Balance
            </li>

            <li
              className={
                activePage > 5
                  ? 'step step-primary cursor-pointer'
                  : 'grid step cursor-pointer'
              }
              onClick={() => navigate('/review')}
            >
              Review
            </li>

            <li
              className={
                activePage > 6
                  ? 'step step-primary cursor-pointer'
                  : 'grid step cursor-pointer'
              }
              onClick={() => navigate('/submit')}
            >
              Submit
            </li> */}
        </ul>
        {location.pathname !== '/ofp' ? (
          <button
            className='btn'
            onClick={() => {
              const path = location.pathname
              switch (path) {
                case '/basicdata':
                  navigate('/route')
                  break
                case '/route':
                  navigate('/weather')
                  break
                case '/weather':
                  navigate('/ofp')
                  break
                default:
                  break
              }
            }}
          >
            👉
          </button>
        ) : (
          <button className='btn' onClick={() => navigate('/')}>
            🏠
          </button>
        )}
      </div>
    </>
  )
}

ProgressSteps.defaultProps = {
  activePage: 0,
}

export default ProgressSteps
