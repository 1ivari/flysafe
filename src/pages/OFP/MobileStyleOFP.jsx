import { motion } from 'framer-motion'

function MobileStyleOFP(props) {
  const { ofp, handleChangeRecalculate, toggle, toggleLock } = props

  return (
    <div className='lg:hidden flex flex-col justify-center'>
      <div className='border border-base-300 bg-base-100 rounded-box my-1 grid grid-cols-4 justify-items-center'>
        <div className='text-md'>Leg</div>
        <div className='text-md'>Time</div>
        <div className='text-md'>Heading</div>
        <div className='text-md'>Distance</div>
      </div>
      {ofp.slice(1).map((row, idx) => {
        return (
          <div
            key={row.key}
            tabIndex={0}
            className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1'
          >
            <input type='checkbox' />
            <div className='collapse-title grid grid-cols-4 justify-items-center'>
              <div className='text-sm font-medium'>{row.description}</div>
              <div className='text-sm'>{row.timeInt.format('HH:mm')}</div>
              <div className='text-sm flex flex-row '>
                {row.mh.toFixed(0)}°
                <motion.div
                  animate={{ rotate: Number(row.tas) }}
                  className='origin-center bg-base-300'
                >
                  <svg
                    className='h-5 ml-2'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                  >
                    {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path d='M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z' />
                  </svg>
                </motion.div>
              </div>

              <div className='text-sm'>{row.distInt.toFixed(0)} NM</div>
            </div>
            <div className='collapse-content'>
              <div className='grid grid-cols-4 justify-items-center mt-2 border border-base-300 rounded-box p-2'>
                <input
                  type='checkbox'
                  className='toggle'
                  onClick={toggleLock}
                />
                <div className='text-md'>TAS (kt)</div>
                <div className='text-md'>Wind (°)</div>
                <div className='text-md'>Wind (kt)</div>
                <div className=''></div>
                <input
                  id={row.key}
                  value={row.tas}
                  name='tas'
                  onChange={(e) => handleChangeRecalculate(e)}
                  disabled={toggle}
                  className='input input-xs text-base max-w-xs w-14 text-center m-2'
                />
                <input
                  id={row.key}
                  value={row.wind}
                  name='wind'
                  onChange={(e) => handleChangeRecalculate(e)}
                  disabled={toggle}
                  className='input input-xs text-base max-w-xs w-14 text-center m-2'
                />
                <input
                  id={row.key}
                  value={row.windSpeed}
                  name='windSpeed'
                  onChange={(e) => handleChangeRecalculate(e)}
                  disabled={toggle}
                  className='input input-xs text-base max-w-xs w-14 text-center m-2'
                />
              </div>

              <div className=''>Details</div>
              <ul>
                <li>Wind: {row.wind}</li>
                <li>Wind Speed: {row.windSpeed}</li>
                <li>TC: {row.tc.toFixed(0)}</li>
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MobileStyleOFP
