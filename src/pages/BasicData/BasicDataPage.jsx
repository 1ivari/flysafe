import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import AircraftSelector from './AircraftSelector'
import AppContext from '../../context/AppContext.jsx'
import { useContext } from 'react'

function BasicDataPage() {
  const { basicData, setBasicData, aircrafts, handleAircraftChange } =
    useContext(AppContext)

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

      <div className='flex flex-col items-center justify-center my-4'>
        <div className='form-control w-full max-w-xs'>
          <label className='label'>
            <span className='label-text'>Date</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <input
            name='date'
            type='date'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
          />

          <label className='label'>
            <span className='label-text'>Persons On Board</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <input
            name='pob'
            type='number'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
          />

          <label className='label'>
            <span className='label-text'>Select Aircraft</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <select
            onChange={handleAircraftChange}
            className='select select-bordered'
          >
            {aircrafts.map((aircraft) => {
              return (
                <option key={aircraft.id} value={aircraft.id}>
                  {aircraft.name}
                </option>
              )
            })}
          </select>

          <label className='label'>
            <span className='label-text'>Crew</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <input
            name='crew'
            type='text'
            placeholder='Type initials here'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
          />

          <label className='label'>
            <span className='label-text'>Rules</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <select
            name='rules'
            className='select select-bordered'
            onChange={handleChange}
          >
            <option value='IFR'>IFR</option>
            <option value='VFR'>VFR</option>
          </select>

          <label className='label'>
            <span className='label-text'>Default TAS</span>
            <span className='label-text-alt'>For Flight Plan</span>
          </label>
          <input
            name='defaultTAS'
            type='number'
            placeholder='Type here'
            className='input input-bordered w-full max-w-xs'
            onChange={handleChange}
          />
        </div>
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
