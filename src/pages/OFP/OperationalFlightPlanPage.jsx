import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'
import ProgressSteps from '../../components/ProgressSteps'
import ProgressStepsMobile from '../../components/ProgressStepsMobile'
import { useEffect, useState } from 'react'

// New imports after utils folder created
function OperationalFlightPlanPage() {
  // TODO: dynamic table https://www.pluralsight.com/guides/dynamic-tables-from-editable-columns-in-react-html
  // TODO: https://atomizedobjects.com/blog/react/how-to-render-an-array-of-objects-with-map-in-react

  const { ofp, dispatch } = useContext(AppContext)
  const [toggle, setToggle] = useState('')
  function toggleLock(e) {
    if (e.target.checked) {
      setToggle('disabled')
    } else {
      setToggle('')
    }
  }

  useEffect(() => {
    ofp.forEach((item) => {
      dispatch({ type: 'RECALCULATE', payload: { id: item.id } })
      console.log('recalculated')
    })
  }, [])

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_ITEM',
      payload: { name: e.target.name, value: e.target.value, id: e.target.id },
    })
  }

  const handleChangeRecalculate = (e) => {
    // dispatch({
    // 	type: 'CHANGE_TAS',
    // 	payload: { id: e.target.id, value: e.target.value },
    // })
    dispatch({
      type: 'CHANGE_ITEM',
      payload: { name: e.target.name, value: e.target.value, id: e.target.id },
    })
    dispatch({ type: 'RECALCULATE', payload: { id: e.target.id } })
  }

  return (
    <>
      <ProgressSteps activePage={4} />
      <div className='hidden lg:flex flex-col justify-center p-6 max-w-xl'>
        <table id='ofpTable' className='table table-compact'>
          <thead>
            <tr>
              <th>Route</th>
              <th>Min Alt</th>
              <th>Plan Alt</th>
              <th>TAS</th>
              <th>Wind</th>
              <th>Wind speed</th>
              <th>Tc</th>
              <th>Wca</th>
              <th>Th</th>
              <th>Var</th>
              <th>Mh</th>
              <th>Dev</th>
              <th>Ch</th>
              <th>Dist Int</th>
              <th>Dist Acc</th>
              <th>Gs</th>
              <th>Time Int</th>
              <th>Time Acc</th>
              <th>ER</th>
              <th>A</th>
              <th>FuelEst</th>
              <th>FuelAct</th>
              <th>Rem</th>
            </tr>
          </thead>
          <tbody>
            {ofp.slice(1).map((row, idx) => {
              return (
                <tr key={row.key} className='hover'>
                  <td>{row.description}</td>
                  <td>
                    {idx > 0 ? (
                      <input
                        id={row.key}
                        key={row.key}
                        value={row.minAlt}
                        name='minAlt'
                        onChange={(e) => handleChange(e)}
                        className='input input-xs text-base max-w-xs w-14'
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {idx > 0 ? (
                      <input
                        key={row.key}
                        value={row.planAlt}
                        name='planAlt'
                        onChange={(e) => handleChange(e)}
                        className='input input-xs text-base max-w-xs w-14'
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {idx > 0 ? (
                      <input
                        id={row.key}
                        value={row.tas}
                        name='tas'
                        onChange={(e) => handleChangeRecalculate(e)}
                        className='input input-xs text-base max-w-xs w-14'
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {idx > 0 ? (
                      <input
                        id={row.key}
                        key={row.key}
                        value={row.wind}
                        name='wind'
                        onChange={(e) => handleChangeRecalculate(e)}
                        className='input input-xs text-base max-w-xs w-14'
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    {idx > 0 ? (
                      <input
                        id={row.key}
                        key={row.key}
                        value={row.windSpeed}
                        name='windSpeed'
                        onChange={(e) => handleChangeRecalculate(e)}
                        className='input input-xs text-base max-w-xs w-14'
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{row.tc.toFixed(0)}</td>
                  <td>{row.wca.toFixed(0)}</td>
                  <td>{row.th.toFixed(0)}</td>
                  <td>{row.var.toFixed(1)}</td>
                  <td>{row.mh.toFixed(0)}</td>
                  <td>{row.dev}</td>
                  <td>{row.ch}</td>
                  <td>{row.distInt.toFixed(0)}</td>
                  <td>{row.distAcc.toFixed(0)}</td>
                  <td>{row.gs.toFixed(0)}</td>
                  <td>{row.timeInt.format('HH:mm')}</td>
                  <td>{row.timeAcc.format('HH:mm')}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

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

      <ProgressStepsMobile
        activePage={4}
        nextPage={'/wnb'}
        previousPage={'/weather'}
      />

      {/* <link
				rel='stylesheet'
				type='text/css'
				href='./style/printOfp.css'
				media='print'
			/> */}

      {/* <link
				rel='stylesheet'
				type='text/css'
				href='/path/to/print.css'
				media='print and (url=http://www.example.com/specific-url)'
			/> */}
    </>
  )
}

export default OperationalFlightPlanPage
