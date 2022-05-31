import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function OperationalFlightPlan() {
	return (
		<>
			<ProgressSteps activePage={3} />
			<div>OFP here</div>
			<PreviousNextBtn previousPage='/wnb' nextPage='/' />
		</>
	)
}

export default OperationalFlightPlan
