import PreviousNextBtn from '../PreviousNextBtn'
import ProgressSteps from '../ProgressSteps'
import AirfieldSearch from '../AirfieldSearch'
import MapBox from '../MapBox'

function RoutePage() {
  // const render = (status: Status) => {
  // 	return <h1>{status}</h1>
  // }

  // const [clicks, setClicks] = useState([])
  // const [zoom, setZoom] = useState(3) // initial zoom
  // const [center, setCenter] = useState({
  // 	lat: 0,
  // 	lng: 0,
  // })

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-3'>
          <ProgressSteps activePage={2} />
        </div>
        <div className='col-span-3'>
          <PreviousNextBtn previousPage='/basicdata' nextPage='/Weather' />
        </div>

        <div className='flex flex-col justify-center py-12 px-6 lg:px-8'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-neutral py-8 px-6 shadow rounded-lg sm:px-10'>
              <div className='mb-0 space-y-6'>
                <AirfieldSearch />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center py-12 px-3 lg:px-4 col-span-2'>
          <div className='map-container'>
            <MapBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default RoutePage
