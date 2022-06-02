import FetchMetar from '../FetchMetar'
import icao from '../../data/icao.json'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function WeatherPage() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<div>Weather</div>

			<FetchMetar />

			<div>
				moikk
				{icao.forEach((item) => {
					if (item.ident === 'EFPO') {
						console.log(item.municipality)
					}
				})}
			</div>
			<PreviousNextBtn previousPage='/basicdata' nextPage='/ofp' />
		</>
	)
}

export default WeatherPage
