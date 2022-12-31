import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'
import AirfieldSearchAutoComplete from '../components/AirfieldSearchAutoComplete'
import RouteMap from '../components/RouteMap'
import { Route } from 'react-router-dom'
import RouteMapDefault from '../components/RouteMapDefault'

function RoutePage() {
	return (
		<>
			<div className='grid grid-cols-3'>
				<div className='col-span-3'>
					<ProgressSteps activePage={2} />
				</div>
				<div className='col-span-3'>
					<PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />
				</div>
			</div>

			<div className='relative'>
				<div className='map-container' id='map-container'>
					<RouteMap />
					{/* <RouteMapDefault /> */}
					{/* For debugging the mapbox map */}
				</div>
				<div className='absolute top-5 left-5'>
					<AirfieldSearchAutoComplete />
				</div>
			</div>
		</>
	)
}

export default RoutePage
