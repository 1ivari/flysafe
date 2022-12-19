import PreviousNextBtn from '../components/PreviousNextBtn'
import ProgressSteps from '../components/ProgressSteps'
import AircraftSelector from '../components/AircraftSelector'
import AppContext from '../context/AppContext.jsx'
import { useContext } from 'react'

function BasicDataPage() {
  const { basicData, setBasicData } = useContext(AppContext)

  const handleChange = (e) => {
    setBasicData({ ...basicData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='grid grid-cols-3'>
        <div className='col-span-3'>
          <ProgressSteps activePage={1} />
        </div>
        <div className='col-span-3'>
          <PreviousNextBtn previousPage='/' nextPage='/route' />
        </div>

        <div className='flex flex-col justify-center py-12 px-6 lg:px-8'>
          <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-neutral py-8 px-6 shadow rounded-lg sm:px-10'>
              <form className='mb-0 space-y-6' action='#' method='POST'>
                <div>
                  <label className='block text-sm font-medium text-white-700'>
                    Date
                  </label>
                  <div className='mt-1'>
                    <input
                      className='bg-gray-200 rounded'
                      name='date'
                      type='date'
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-white-700'>
                    Persons on Board
                  </label>
                  <div className='mt-1'>
                    <input
                      className='bg-gray-200 rounded'
                      name='pob'
                      type='number'
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-white-700'>
                    Aircraft
                  </label>
                  <AircraftSelector />
                </div>

                <div>
                  <label className='block text-sm font-medium text-white-700'>
                    Crew
                  </label>
                  <div className='mt-1'>
                    <input
                      name='crew'
                      type='text'
                      className='bg-gray-200 rounded'
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-white-700'>
                    Rules
                  </label>
                  <div className='mt-1'>
                    <select
                      name='rules'
                      className='bg-gray-200 rounded'
                      onChange={handleChange}
                    >
                      <option value='vfr'>VFR</option>
                      <option value='ifr'>IFR</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BasicDataPage
