import { useContext } from 'react'
import AppContext from '../context/AppContext.jsx'

function ProgressSteps() {
  const { activePage } = useContext(AppContext)

  return (
    <div>
      <ul className='steps'>
        <li className={activePage > 0 ? 'step step-primary' : 'step'}>
          Basic data
        </li>
        <li className={activePage > 1 ? 'step step-primary' : 'step'}>
          Weight and Balance
        </li>
        <li className={activePage > 2 ? 'step step-primary' : 'step'}>
          Operational Flight Plan
        </li>
        <li className={activePage > 3 ? 'step step-primary' : 'step'}>
          Review
        </li>
        <li className={activePage > 4 ? 'step step-primary' : 'step'}>
          Submit
        </li>
      </ul>
    </div>
  )
}

export default ProgressSteps
