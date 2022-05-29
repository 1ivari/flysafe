import { Navigate, useNavigate } from 'react-router-dom'
import PerfTable from '../PerfTable'
import ProgressSteps from '../ProgressSteps'
import { useContext } from 'react'
import AppContext from '../../context/AppContext.jsx'

function WeightAndBalance() {
  const { setActivePage } = useContext(AppContext)
  setActivePage(2)
  return (
    <>
      <ProgressSteps />
      <PerfTable />
    </>
  )
}

export default WeightAndBalance
