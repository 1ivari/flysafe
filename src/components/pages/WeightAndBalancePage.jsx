import PerfTable from '../PerfTable'
import ProgressSteps from '../ProgressSteps'
import PreviousNextBtn from '../PreviousNextBtn'

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
