import FetchMetar from '../FetchMetar'
import icao from '../../data/icao.json'
import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'

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
        <FetchMetar />
      </div>
    </>
  )
}

export default WeatherPage
