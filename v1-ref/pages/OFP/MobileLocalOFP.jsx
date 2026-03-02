import React from 'react'

function MobileLocalOFP(props) {
  const { ofp, handleChange, handleRecalculateLocal } = props
  return (
    <>
      <div
        id='mobilestyleofp'
        className='flex flex-col justify-center mobileofp'
      >
        {ofp.map((row, idx) => {
          return (
            <div
              key={row.key}
              className='border border-base-300 bg-base-100 rounded-box my-1'
            >
              <div className='grid grid-cols-6 justify-items-center items-center text-center'>
                {idx === 0 ? (
                  <>
                    <div className='text-md mb-2'>Leg</div>
                    <div className='text-md mb-2'>Min Alt.</div>
                    <div className='text-md mb-2'>Plan Alt.</div>
                    <div className='text-md mb-2'>Time</div>
                    <div className='text-md mb-2'>Acc. Time</div>
                    <div className='text-md mb-2'>Fuel Rem.</div>
                    <div className='text-sm font-medium'>{row.description}</div>
                    <div className='text-sm'></div>
                    <div className='text-sm'></div>
                    <div className='text-sm'></div>
                    <div className='text-sm'></div>
                    <div className='text-sm'>{row.fuelRem}</div>
                  </>
                ) : (
                  <>
                    <div className='text-md mb-2'>Leg</div>
                    <div className='text-md mb-2'>Min Alt.</div>
                    <div className='text-md mb-2'>Plan Alt.</div>
                    <div className='text-md mb-2'>Time</div>
                    <div className='text-md mb-2'>Acc. Time</div>
                    <div className='text-md mb-2'>Fuel Rem.</div>
                    <div className='text-sm font-medium'>{row.description}</div>
                    <div className='text-sm'>
                      <input
                        id={row.key}
                        value={row.minAlt}
                        name='minAlt'
                        type='number'
                        onChange={(e) => handleChange(e)}
                        className='input input-primary input-xs text-base max-w-xs w-14 text-center m-2'
                      />
                    </div>
                    <div className='text-sm'>
                      <input
                        id={row.key}
                        value={row.planAlt}
                        name='planAlt'
                        type='text'
                        onChange={(e) => handleChange(e)}
                        className='input input-primary input-xs text-base max-w-xs w-14 text-center m-2'
                      />
                    </div>
                    <div className='text-sm'>
                      <input
                        id={row.key}
                        value={row.timeInt}
                        name='timeInt'
                        type='number'
                        onChange={(e) => handleRecalculateLocal(e)}
                        className='input input-primary input-xs text-base max-w-xs w-14 text-center m-2'
                      />
                    </div>
                    <div className='text-sm'>{row.timeAcc}</div>
                    <div className='text-sm'>{row.fuelRem}</div>
                  </>
                )}
              </div>
              <div className='collapse-content'></div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default MobileLocalOFP
