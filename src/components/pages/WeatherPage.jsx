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
        <div className='flex flex-col justify-center py-12 px-6 lg:px-8'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-neutral py-8 px-6 shadow rounded-lg sm:px-10'>
              <div className='mb-0 space-y-6'>
                <FetchMetar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WeatherPage
