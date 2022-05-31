import PerfTable from '../PerfTable'
import ProgressSteps from '../ProgressSteps'
import PreviousNextBtn from '../PreviousNextBtn'

function WeightAndBalance() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<PerfTable />
			<PreviousNextBtn previousPage='/basicdata' nextPage='/ofp' />
		</>
	)
}

export default WeightAndBalance
