import MetarList from './MetarList'
import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import Drawer from '../../components/Drawer'

function WeatherPage() {
  return (
    <>
      <Drawer>
        <ProgressSteps activePage={3} />
        <div className='flex flex-col mx-4'>
          {/* returns ul */}
          <MetarList />
        </div>
        <ProgressStepsMobile
          activePage={3}
          nextPage={'/ofp'}
          previousPage={'/route'}
        />
      </Drawer>
    </>
  )
}

export default WeatherPage
