import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'
import AirfieldSearchAutoComplete from '../components/AirfieldSearchAutoComplete'
import RouteMap from '../components/RouteMap'
import { Route } from 'react-router-dom'
import RouteMapDefault from '../components/RouteMapDefault'

function RoutePage() {
	return (
		<>
			<div className='container flex flex-col items-center md:mx-auto'>
				<div className=''>
					<ProgressSteps activePage={2} />
				</div>
				<div className=''>
					<PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />
				</div>

				<div className='flex flex-col items-center md:relative md:w-full'>
					<div className='z-40 md:absolute md:top-5 md:left-5'>
						<AirfieldSearchAutoComplete />
					</div>
					<div className='map-container' id='map-container'>
						<RouteMap />
						{/* <RouteMapDefault /> */}
						{/* For debugging the mapbox map */}
					</div>
				</div>
			</div>
		</>
	)
}

export default RoutePage
