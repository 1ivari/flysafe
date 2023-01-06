import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import AircraftSelector from './AircraftSelector'
import AppContext from '../../context/AppContext.jsx'
import { useContext } from 'react'

function BasicDataPage() {
  const { basicData, setBasicData } = useContext(AppContext)

  const handleChange = (e) => {
    setBasicData({ ...basicData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='flex justify-center my-2 '>
        <h1 className='w-72 rounded text-center text-xl text-bold text-white bg-gradient-to-r from-primary to-secondary '>
          Basic Data
        </h1>
      </div>
      <ProgressSteps activePage={1} />

      <div className='flex justify-center my-4'>
        <form className='mb-0 space-y-4'>
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

          <div>
            <label className='block text-sm font-medium text-white-700'>
              Default TAS
            </label>
            <div className='mt-1'>
              <input
                name='defaultTas'
                type='number'
                className='bg-gray-200 rounded'
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
      <ProgressStepsMobile
        activePage={1}
        nextPage={'/route'}
        previousPage={'/basicdata'}
      ></ProgressStepsMobile>
    </>
  )
}

export default BasicDataPage
