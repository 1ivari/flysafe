import FetchMetar from '../FetchMetar'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function Weather() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<div>Weather</div>
			<FetchMetar />
			<PreviousNextBtn previousPage='/basicdata' nextPage='/ofp' />
		</>
	)
}

export default Weather
