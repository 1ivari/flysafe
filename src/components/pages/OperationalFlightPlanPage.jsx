import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
	return (
		<>
			<ProgressSteps activePage={4} />
			<PreviousNextBtn previousPage='/weather' nextPage='/wnb' />
			<div>OFP here</div>
		</>
	)
}

export default OperationalFlightPlanPage
