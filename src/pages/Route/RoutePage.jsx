import ProgressSteps from '../../components/ProgressSteps'
import AirfieldSearchAutoComplete from './AirfieldSearchAutoComplete'
import LeafletMap from './LeafletMap'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import Drawer from '../../components/Drawer'
import useMediaQuery from '../../hooks/useMediaQuery'

// TODO:
// 1. Add margin to bottom of map so that bottom nav bar does not overlap map

function DrawerContent() {
  return (
    <>
      <li className='menu-title mt-2'>
        <span>Map Settings to be added</span>
      </li>
    </>
  )
}

function RoutePage() {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')
  return (
    <>
      <Drawer drawerContent={<DrawerContent />}>
        <ProgressSteps activePage={2} />
        <div className='flex flex-col items-center lg:relative lg:w-full'>
          <div className='flex w-full justify-evenly items-center'>
            <div className='z-[1000] lg:absolute lg:top-5 lg:left-12'>
              <AirfieldSearchAutoComplete />
            </div>
          </div>
          {isLargeScreen ? (
            <div className='map-container' id='map-container'>
              <LeafletMap />
            </div>
          ) : (
            <div className='map-container-mobile' id='map-container-mobile'>
              <LeafletMap />
            </div>
          )}
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
