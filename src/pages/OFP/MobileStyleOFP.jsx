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
              <div className='text-sm'>{row.mh.toFixed(0)}°</div>
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
