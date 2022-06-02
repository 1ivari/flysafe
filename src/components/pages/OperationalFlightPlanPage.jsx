import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlanPage() {
	return (
		<>
			<ProgressSteps activePage={4} />
			<div>OFP here</div>
			<PreviousNextBtn previousPage='/weather' nextPage='/wnb' />
		</>
	)
}

export default OperationalFlightPlanPage
