import PerfTable from '../PerfTable'
import ProgressSteps from '../ProgressSteps'
import PreviousNextBtn from '../PreviousNextBtn'

function WeightAndBalance() {
	return (
		<>
			<ProgressSteps activePage={4} />
			<PerfTable />
			<PreviousNextBtn previousPage='/ofp' nextPage='/' />
		</>
	)
}

export default WeightAndBalance
