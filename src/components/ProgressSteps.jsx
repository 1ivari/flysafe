import { useNavigate } from 'react-router-dom'

function ProgressSteps({ activePage }) {
  const navigate = useNavigate()
  return (
    <>
      <div
        id='progressSteps'
        className='hidden lg:flex justify-center text-xs my-2'
      >
        <div>
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
              Operational Flight Plan
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
        </div>
      </div>
    </>
  )
}

ProgressSteps.defaultProps = {
  activePage: 0,
}

export default ProgressSteps
