import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'
import AirfieldSearchAutoComplete from '../components/AirfieldSearchAutoComplete'
import RouteMap from '../components/RouteMap'
import { Route } from 'react-router-dom'
import RouteMapDefault from '../components/RouteMapDefault'
import ProgressStepsMobile from '../components/ProgressStepsMobile'
import MapSettings from '../components/MapSettings'

function RoutePage() {
	return (
		<>
			<ProgressSteps activePage={2} />
			<div className='flex flex-col items-center lg:relative lg:w-full'>
				<div className='flex w-full justify-evenly items-center'>
					<div className='z-40 lg:absolute lg:top-5 lg:left-5'>
						<AirfieldSearchAutoComplete />
					</div>
					<div className='z-40 lg:absolute lg:top-5 lg:right-14'>
						<MapSettings />
					</div>
				</div>

				<div className='map-container' id='map-container'>
					<RouteMap />
					{/* <RouteMapDefault /> */}
					{/* For debugging the mapbox map */}
				</div>
			</div>

			<ProgressStepsMobile
				activePage={2}
				nextPage={'/weather'}
				previousPage={'/basicdata'}
			/>
		</>
	)
}

export default RoutePage
