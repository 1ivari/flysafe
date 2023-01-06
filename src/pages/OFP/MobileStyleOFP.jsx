import { motion } from 'framer-motion'
import { useState } from 'react'

function MobileStyleOFP(props) {
  const { ofp, handleChangeRecalculate } = props

  const initToggle = ofp.map((row) => {
    return { id: row.key, toggle: '' }
  })
  const [toggle, setToggle] = useState('')
  function toggleLock(e) {
    if (e.target.checked) {
      setToggle('disabled')
    } else {
      setToggle('')
    }
  }

  return (
    <div className='lg:hidden flex flex-col justify-center'>
      {ofp.slice(1).map((row, idx) => {
        return (
          <div
            key={row.key}
            tabIndex={0}
            className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1'
          >
            <input type='checkbox' />
            <div className='collapse-title grid grid-cols-4 justify-items-center items-center'>
              {idx === 0 ? (
                <>
                  <div className='text-md mb-2'>Leg</div>
                  <div className='text-md mb-2'>Time</div>
                  <div className='text-md mb-2'>Heading</div>
                  <div className='text-md mb-2'>Distance</div>
                </>
              ) : null}
              <div className='text-sm font-medium'>{row.description}</div>
              <div className='text-sm'>{row.timeInt.format('HH:mm')}</div>
              <div className='text-sm flex flex-row '>
                {row.mh.toFixed(0)}°
                <motion.div
                  animate={{ rotate: Number(row.mh) }}
                  className='origin-center ml-2'
                >
                  <svg
                    className='h-5 block m-auto primary'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 384 512'
                  >
                    {/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                    <path
                      fill='#ffffff'
                      d='M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z'
                    />
                  </svg>
                </motion.div>
              </div>

              <div className='text-sm'>{row.distInt.toFixed(0)} NM</div>
            </div>
            <div className='collapse-content'>
              <div className='grid grid-cols-4 justify-items-center items-center mt-2 border border-base-300 rounded-box p-2'>
                <div className='text-md'>Lock</div>
                <div className='text-md'>TAS (kt)</div>
                <div className='text-md'>Wind (°)</div>
                <div className='text-md'>Wind (kt)</div>
                <input
                  type='checkbox'
                  className='toggle toggle-primary toggle-md'
                  onClick={toggleLock}
                />

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
