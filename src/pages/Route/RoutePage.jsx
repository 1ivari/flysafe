import ProgressSteps from '../../components/ProgressSteps'
import AirfieldSearchAutoComplete from './AirfieldSearchAutoComplete'
import RouteMap from './RouteMap'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import MapSettings from './MapSettings'
import Drawer from '../../components/Drawer'

// TODO:
// 1. Add margin to bottom of map so that bottom nav bar does not overlap map

function DrawerContent() {
  return (
    <ul className='menu p-4 w-80 bg-base-100 text-base-content'>
      {/* <!-- Sidebar content here --> */}
      <li>
        <MapSettings />
      </li>
    </ul>
  )
}

function RoutePage() {
  return (
    <>
      <Drawer drawerContent={<DrawerContent />}>
        <ProgressSteps activePage={2} />
        <div className='flex flex-col items-center lg:relative lg:w-full'>
          <div className='flex w-full justify-evenly items-center'>
            <div className='z-10 lg:absolute lg:top-5 lg:left-5'>
              <AirfieldSearchAutoComplete />
            </div>
          </div>

          <div className='map-container' id='map-container'>
            <RouteMap />
          </div>
        </div>

        <ProgressStepsMobile
          activePage={2}
          nextPage={'/weather'}
          previousPage={'/basicdata'}
        />
      </Drawer>
    </>
  )
}

export default RoutePage
