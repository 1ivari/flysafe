import PerfTable from '../components/PerfTable'
import ProgressSteps from '../components/ProgressSteps'
import PreviousNextBtn from '../components/PreviousNextBtn'

function WeightAndBalancePage() {
  return (
    <>
      <ProgressSteps activePage={5} />
      <PreviousNextBtn previousPage='/ofp' nextPage='/' />
      <PerfTable />
    </>
  )
}

export default WeightAndBalancePage
