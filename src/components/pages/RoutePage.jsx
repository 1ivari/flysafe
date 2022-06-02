import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'
import AirfieldSearch from '../AirfieldSearch'

function RoutePage() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />
			<AirfieldSearch />
		</>
	)
}

export default RoutePage
