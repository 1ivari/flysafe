import React from 'react'
import { useContext } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import AppContext from '../../context/AppContext'
dayjs.extend(duration)

const stylingObject = {
  td: {
    padding: '2px',
    textAlign: 'center',
  },
  th: {
    padding: '6px',
  },
}

function OriginalTableStyleFuel() {
  const { basicData, setBasicData, ofp } = useContext(AppContext)
  const lastOfpRow = ofp[ofp.length - 1]
  const taxiFuel = 5
  return (
    <div id='fuelTable' className='table table-compact'>
      <thead>
        <tr>
          <th style={stylingObject.th} colSpan='2' className='text-center'>
            Fuel Calc
          </th>
          <th style={stylingObject.th} className='text-center'>
            Time 1
          </th>
          <th style={stylingObject.th} className='text-center'>
            Fuel
          </th>
          <th style={stylingObject.th} className='text-center'>
            Time 2
          </th>
          <th style={stylingObject.th} className='text-center'>
            Fuel
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={stylingObject.td}>Trip</td>
          <td style={stylingObject.td}>
            <input
              type='number'
              value={basicData.tripFuel}
              onChange={(e) =>
                setBasicData({ ...basicData, [e.target.name]: e.target.value })
              }
              name='tripFuel'
              className=' input input-primary input-xs text-base max-w-xs w-12 text-center'
            />
          </td>
          <td style={stylingObject.td}>{lastOfpRow.timeAcc}</td>
          <td style={stylingObject.td}>
            {Number(lastOfpRow.timeAccRaw * basicData.tripFuel).toFixed(1)}
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Contingency
          </td>
          <td style={stylingObject.td}>0:11</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
              defaultValue='7.0'
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Alternate 1
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Alternate 2
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Additional
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Final Res
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Min Take-off
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Extra
          </td>
          <td style={stylingObject.td}>0:00</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Take-off
          </td>
          <td style={stylingObject.td}>
            {basicData.rampFuel > 5
              ? dayjs
                  .duration(
                    (basicData.rampFuel - taxiFuel) / basicData.tripFuel,
                    'hours'
                  )
                  .format('HH:mm')
              : '00:00'}
          </td>
          <td style={stylingObject.td}>
            {basicData.rampFuel > 5 ? basicData.rampFuel - taxiFuel : 0}
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Taxi
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            {basicData.rampFuel > 5 ? taxiFuel : 0}
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
        <tr>
          <td style={stylingObject.td} colSpan='2'>
            Ramp
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              type='number'
              value={basicData.rampFuel}
              onChange={(e) =>
                setBasicData({ ...basicData, [e.target.name]: e.target.value })
              }
              className='input input-primary input-xs text-base max-w-xs w-12 text-center'
              name='rampFuel'
              id=''
            />
          </td>
          <td style={stylingObject.td}></td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
            />
          </td>
        </tr>
      </tbody>
    </div>
  )
}

export default OriginalTableStyleFuel
