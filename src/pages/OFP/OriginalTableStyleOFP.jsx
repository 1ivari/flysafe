import React from 'react'

export default function OriginalTableStyleOFP(props) {
  const { ofp, handleChange, handleChangeRecalculate } = props
  return (
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
                  <input
                    id={row.key}
                    key={row.key}
                    value={row.minAlt}
                    name='minAlt'
                    onChange={(e) => handleChange(e)}
                    className='input input-xs text-base max-w-xs w-14'
                  />
                </td>
                <td>
                  <input
                    key={row.key}
                    value={row.planAlt}
                    name='planAlt'
                    onChange={(e) => handleChange(e)}
                    className='input input-xs text-base max-w-xs w-14'
                  />
                </td>
                <td>
                  <input
                    id={row.key}
                    value={row.tas}
                    name='tas'
                    onChange={(e) => handleChangeRecalculate(e)}
                    className='input input-xs text-base max-w-xs w-14'
                  />
                </td>
                <td>
                  <input
                    id={row.key}
                    key={row.key}
                    value={row.wind}
                    name='wind'
                    onChange={(e) => handleChangeRecalculate(e)}
                    className='input input-xs text-base max-w-xs w-14'
                  />
                </td>
                <td>
                  <input
                    id={row.key}
                    key={row.key}
                    value={row.windSpeed}
                    name='windSpeed'
                    onChange={(e) => handleChangeRecalculate(e)}
                    className='input input-xs text-base max-w-xs w-14'
                  />
                </td>
                <td>{row.tc.toFixed(0)}</td>
                <td>{row.wca.toFixed(0)}</td>
                <td>{row.th.toFixed(0)}</td>
                <td>{row.declination.toFixed(1)}</td>
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
  )
}
