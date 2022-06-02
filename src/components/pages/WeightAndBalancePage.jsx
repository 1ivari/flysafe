import PerfTable from '../PerfTable'
import ProgressSteps from '../ProgressSteps'
import PreviousNextBtn from '../PreviousNextBtn'

function WeightAndBalancePage() {
	return (
		<>
			<ProgressSteps activePage={5} />
			<PerfTable />
			<PreviousNextBtn previousPage='/ofp' nextPage='/' />
		</>
	)
}

export default WeightAndBalancePage
