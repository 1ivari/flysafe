import FetchMetar from '../FetchMetar'
import icao from '../../data/icao.json'
import FetchNavAid from '../FetchNavAid'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

function Weather() {
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

export default Weather
