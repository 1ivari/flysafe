import { motion } from 'framer-motion'
import { useState } from 'react'

function MobileStyleOFP(props) {
  const { ofp, handleChangeRecalculate, ofpLock } = props

  return (
    <>
      <div
        id='mobilestyleofp'
        className='flex flex-col justify-center mobileofp'
      >
        {ofp.slice(1).map((row, idx) => {
          return (
            <div
              key={row.key}
              tabIndex={0}
              className='collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-1'
            >
              <input type='checkbox' />
              <div className='collapse-title grid grid-cols-5 justify-items-center items-center text-center'>
                {idx === 0 ? (
                  <>
                    <div className='text-md mb-2'>Leg</div>
                    <div className='text-md mb-2'>MH</div>
                    <div className='text-md mb-2'>TC</div>
                    <div className='text-md mb-2'>Time</div>
                    <div className='text-md mb-2'>Dist.</div>
                  </>
                ) : null}
                <div className='text-sm font-medium'>{row.description}</div>
                <div className='text-sm flex flex-row '>
                  {row.mh !== null ? row.mh.toFixed(0) : ''}°
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
                <div className='text-sm'>{row.tc.toFixed(0)}°</div>
                <div className='text-sm'>{row.timeInt}</div>
                <div className='text-sm'>{row.distInt.toFixed(0)} NM</div>
              </div>
              <div className='collapse-content'>
                <div className='grid grid-cols-4 justify-items-center items-center mt-2 border border-base-300 rounded-box p-2'>
                  <div className='text-md'>Plan Alt. (ft)</div>
                  <div className='text-md'>TAS (kt)</div>
                  <div className='text-md'>Wind (°)</div>
                  <div className='text-md'>Wind (kt)</div>
                  <input
                    id={row.key}
                    value={row.planAlt}
                    name='planAlt'
                    onChange={(e) => handleChangeRecalculate(e)}
                    disabled={ofpLock}
                    className='input input-xs text-base max-w-xs w-14 text-center m-2'
                  />
                  <input
                    id={row.key}
                    value={row.tas}
                    name='tas'
                    onChange={(e) => handleChangeRecalculate(e)}
                    disabled={ofpLock}
                    className='input input-xs text-base max-w-xs w-14 text-center m-2'
                  />
                  <input
                    id={row.key}
                    value={Math.round(row.wind)}
                    name='wind'
                    onChange={(e) => handleChangeRecalculate(e)}
                    disabled={ofpLock}
                    className='input input-xs text-base max-w-xs w-14 text-center m-2'
                  />
                  <input
                    id={row.key}
                    value={Math.round(row.windSpeed)}
                    name='windSpeed'
                    onChange={(e) => handleChangeRecalculate(e)}
                    disabled={ofpLock}
                    className='input input-xs text-base max-w-xs w-14 text-center m-2'
                  />
                </div>

                <div className='grid grid-col-2 h-20'>
                  <div className='col-span-2 text-center'>Details</div>
                  <ul>
                    <li>GS: {row.gs.toFixed(0)} kts</li>
                    <li>WCA: {row.wca.toFixed(0)}°</li>
                    <li>Dist Acc: {row.distAcc.toFixed(0)} NM</li>
                  </ul>
                  <ul>
                    <li>kamaa</li>
                    <li>kamaa</li>
                    <li>kamaa</li>
                    <li>kamaa</li>
                    <li>kamaa</li>
                    <li>kamaa</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default MobileStyleOFP
