import MetarList from './MetarList'
import FimDataProvider from './FimDataProvider'
import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'

function WeatherPage() {
  return (
    <>
      <ProgressSteps activePage={3} />
      <div className='flex flex-col mx-4'>
        {/* returns ul */}
        <MetarList />
        <FimDataProvider />
      </div>
      <ProgressStepsMobile
        activePage={3}
        nextPage={'/ofp'}
        previousPage={'/route'}
      />
    </>
  )
}

export default WeatherPage
