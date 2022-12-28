import MetarList from '../components/MetarList'
import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'

function WeatherPage() {
  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-3'>
          <ProgressSteps activePage={3} />
        </div>
        <div className='col-span-3'>
          <PreviousNextBtn previousPage='/route' nextPage='/ofp' />
        </div>
        {/* returns ul */}
        <div className='flex flex-col col-span-2 justify-center py-12 px-6 lg:px-8'>
          <MetarList />
        </div>
      </div>
    </>
  )
}

export default WeatherPage
