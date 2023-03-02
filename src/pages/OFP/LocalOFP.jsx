import React from 'react'

export default function LocalOFP(props) {
  const { ofp, handleChange, handleRecalculateLocal, ofpLock } = props
  return (
    <table id='ofpTable' className='table tablestyleofp text-center'>
      <thead>
        <tr>
          <th>Route</th>
          <th>Min Alt</th>
          <th>Plan Alt</th>
          <th>
            Wind <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Wind <br /> <span className='text-[9px] lowercase'>(kts)</span>
          </th>
          <th>
            Var <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Time Int <br />
            <span className='text-[9px] lowercase'>(min)</span>
          </th>
          <th>
            Add <br />
            <span className='text-[9px] lowercase'>(min)</span>
          </th>
          <th>
            Time Acc <br />
            <span className='text-[9px] lowercase'>(min)</span>
          </th>
          <th>Fuel Est.</th>
          <th>Fuel Act.</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        {ofp.map((row, idx) => {
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
                    type='number'
                    onChange={(e) => handleChange(e)}
                    className='input input-primary input-xs text-base max-w-xs w-14 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>
                {idx > 0 ? (
                  <input
                    id={row.key}
                    value={row.planAlt}
                    name='planAlt'
                    type='text'
                    onChange={(e) => handleChange(e)}
                    className='input input-primary input-xs text-base max-w-xs w-16 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>
                {idx > 0 ? (
                  <input
                    id={row.key}
                    key={row.key}
                    value={Math.round(row.wind)}
                    name='wind'
                    type='number'
                    onChange={(e) => handleChange(e)}
                    className='input input-primary input-xs text-base max-w-xs w-12 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>
                {idx > 0 ? (
                  <input
                    id={row.key}
                    key={row.key}
                    value={Math.round(row.windSpeed)}
                    name='windSpeed'
                    type='number'
                    onChange={(e) => handleChange(e)}
                    className='input input-primary input-xs text-base max-w-xs w-10 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>
                {row.declination.toFixed(0)}°{row.declination > 0 ? 'E' : 'W'}
              </td>
              <td>
                {idx > 0 ? (
                  <input
                    id={row.key}
                    value={row.timeInt}
                    type='number'
                    name='timeInt'
                    onChange={(e) => handleRecalculateLocal(e)}
                    className='input input-primary input-xs text-base max-w-xs w-10 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>
                {idx > 0 ? (
                  <input
                    id={row.key}
                    value={row.timeAdd}
                    type='number'
                    name='timeAdd'
                    onChange={(e) => handleRecalculateLocal(e)}
                    className='input input-primary input-xs text-base max-w-xs w-10 text-center'
                    disabled={ofpLock}
                  />
                ) : null}
              </td>
              <td>{row.timeAcc}</td>
              <td>{row.fuelRem.toFixed(0)}</td>
              <td></td>
              <td></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
