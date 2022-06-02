import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function RoutePage() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<div>Routepage</div>
			<PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />
		</>
	)
}

export default RoutePage
