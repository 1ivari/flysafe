import React from 'react'
import dayjs from 'dayjs'

export default function OriginalTableStyleOFP(props) {
  const { ofp, handleChange, handleChangeRecalculate } = props
  return (
    <table id='ofpTable' className='table tablestyleofp text-center'>
      <thead>
        <tr>
          <th>Route</th>
          <th>Min Alt</th>
          <th>Plan Alt</th>
          <th>
            TAS <br /> <span className='text-[9px] lowercase'>(kts)</span>
          </th>
          <th>
            Wind <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Wind <br /> <span className='text-[9px] lowercase'>(kts)</span>
          </th>
          <th>
            Tc <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Wca <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Th <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Var <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Mh
            <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Dev <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Ch <br /> <span className='text-[9px] lowercase'>(deg)</span>
          </th>
          <th>
            Dist <br /> INT
          </th>
          <th>
            Dist <br /> ACC
          </th>
          <th>
            Gs <br /> <span className='text-[9px] lowercase'>(kts)</span>
          </th>
          <th>
            Time Int <br />
            <span className='text-[9px] lowercase'>(hh:mm)</span>
          </th>
          <th>
            Time Acc <br />
            <span className='text-[9px] lowercase'>(hh:mm)</span>
          </th>
          <th>ETO/RETO</th>
          <th>ATO</th>
          <th>Fuel Est.</th>
          <th>Fuel Act.</th>
          <th>Remarks</th>
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
                  className='input input-xs text-base max-w-xs w-14 text-center'
                />
              </td>
              <td>
                <input
                  key={row.key}
                  value={row.planAlt}
                  name='planAlt'
                  onChange={(e) => handleChange(e)}
                  className='input input-xs text-base max-w-xs w-14 text-center'
                />
              </td>
              <td>
                <input
                  id={row.key}
                  value={row.tas}
                  name='tas'
                  onChange={(e) => handleChangeRecalculate(e)}
                  className='input input-xs text-base max-w-xs w-12 text-center'
                />
              </td>
              <td>
                <input
                  id={row.key}
                  key={row.key}
                  value={row.wind}
                  name='wind'
                  onChange={(e) => handleChangeRecalculate(e)}
                  className='input input-xs text-base max-w-xs w-12 text-center'
                />
              </td>
              <td>
                <input
                  id={row.key}
                  key={row.key}
                  value={row.windSpeed}
                  name='windSpeed'
                  onChange={(e) => handleChangeRecalculate(e)}
                  className='input input-xs text-base max-w-xs w-10 text-center'
                />
              </td>
              <td>{row.tc.toFixed(0)}°</td>
              <td>{row.wca.toFixed(0)}°</td>
              <td>{row.th.toFixed(0)}°</td>
              <td>
                {row.declination.toFixed(0)}°{row.declination > 0 ? 'E' : 'W'}
              </td>
              <td>{row.mh.toFixed(0)}°</td>
              <td>{row.dev}°</td>
              <td>{row.ch}°</td>
              <td>{row.distInt.toFixed(0)} NM</td>
              <td>{row.distAcc.toFixed(0)} NM</td>
              <td>{row.gs.toFixed(0)} kt</td>
              <td>{row.timeInt}</td>
              <td>{row.timeAcc}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
