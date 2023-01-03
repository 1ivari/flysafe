import PerfTable from '../components/PerfTable'
import ProgressSteps from '../components/ProgressSteps'
import ProgressStepsMobile from '../components/ProgressStepsMobile'
import PreviousNextBtn from '../components/PreviousNextBtn'

function WeightAndBalancePage() {
	return (
		<>
			<ProgressSteps activePage={5} />
			<PerfTable />
			<ProgressStepsMobile activePage={5} nextPage='/' previousPage='/ofp' />
		</>
	)
}

export default WeightAndBalancePage
