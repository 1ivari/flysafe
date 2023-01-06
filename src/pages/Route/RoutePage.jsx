import ProgressSteps from '../../components/ProgressSteps'
import AirfieldSearchAutoComplete from './AirfieldSearchAutoComplete'
import RouteMap from './RouteMap'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import MapSettings from './MapSettings'

// TODO:
// 1. Add margin to bottom of map so that bottom nav bar does not overlap map

function RoutePage() {
  return (
    <>
      <ProgressSteps activePage={2} />
      <div className='flex flex-col items-center lg:relative lg:w-full'>
        <div className='flex w-full justify-evenly items-center'>
          <div className='z-10 lg:absolute lg:top-5 lg:left-5'>
            <AirfieldSearchAutoComplete />
          </div>
          <div className='z-10 lg:absolute lg:top-5 lg:right-14'>
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
