import React from 'react'
import { useState } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)

const stylingObject = {
  td: {
    padding: '2px',
    textAlign: 'center',
    // border: '1px solid black',
  },
  th: {
    padding: '6px',
  },
}

function OriginalTableStyleFuel(props) {
  const { ofp, basicData, setBasicData, dispatch } = props
  const lastOfpRow = ofp[ofp.length - 1]
  const taxiFuel = basicData.taxiFuel
  const finalResHrs = 0.5
  const finalResFuel = Number(basicData.fuelConsumption * finalResHrs)
  const tripFuel = Number(lastOfpRow.timeAccRaw * basicData.fuelConsumption)
  const toFuel = basicData.rampFuel > 5 ? basicData.rampFuel - taxiFuel : 0

  const [contFuel, setContFuel] = useState(7)
  const [alt1Fuel, setAlt1Fuel] = useState(0)
  const [alt2Fuel, setAlt2Fuel] = useState(0)
  const [additFuel, setAdditFuel] = useState(0)
  let altFuel = Number(0)
  if (alt1Fuel >= alt2Fuel) {
    altFuel = alt1Fuel
  } else {
    altFuel = alt2Fuel
  }
  const minToFuel = Number(
    tripFuel + contFuel + altFuel + additFuel + finalResFuel
  )
  const extraFuel = toFuel - minToFuel
  const timeFormat = 'H:mm'
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
              value={basicData.fuelConsumption}
              onChange={(e) => {
                setBasicData({
                  ...basicData,
                  [e.target.name]: Number(e.target.value),
                })
                dispatch({
                  type: 'RECALCULATE_FUEL',
                  payload: {
                    rampFuel: basicData.rampFuel,
                    fuelConsumption: e.target.value,
                    taxiFuel: taxiFuel,
                  },
                })
              }}
              name='fuelConsumption'
              className=' input input-primary input-xs text-base max-w-xs w-12 text-center'
            />
          </td>
          <td style={stylingObject.td}>{lastOfpRow.timeAcc}</td>
          <td style={stylingObject.td}>{tripFuel.toFixed(1)}</td>
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
          <td style={stylingObject.td}>
            {basicData.fuelConsumption > 0
              ? dayjs
                  .duration(contFuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '0:00'}
          </td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name='contFuel'
              onChange={(e) => setContFuel(Number(e.target.value))}
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
          <td style={stylingObject.td}>
            {basicData.fuelConsumption > 0
              ? dayjs
                  .duration(alt1Fuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '0:00'}
          </td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              onChange={(e) => setAlt1Fuel(Number(e.target.value))}
              name='alt1Fuel'
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
          <td style={stylingObject.td}>
            {basicData.fuelConsumption > 0
              ? dayjs
                  .duration(alt2Fuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '0:00'}
          </td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              onChange={(e) => setAlt2Fuel(Number(e.target.value))}
              name='alt2Fuel'
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
          <td style={stylingObject.td}>
            {basicData.fuelConsumption > 0
              ? dayjs
                  .duration(additFuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '0:00'}
          </td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              onChange={(e) => setAdditFuel(Number(e.target.value))}
              name='additFuel'
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
          <td style={stylingObject.td}>
            {dayjs.duration(finalResHrs, 'hours').format(timeFormat)}
          </td>
          <td style={stylingObject.td}>{finalResFuel.toFixed(1)}</td>
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
            <strong>Min Take-off</strong>
          </td>
          <td style={stylingObject.td}>
            <strong>
              {basicData.fuelConsumption > 0
                ? dayjs
                    .duration(minToFuel / basicData.fuelConsumption, 'hours')
                    .format(timeFormat)
                : '0:00'}
            </strong>
          </td>
          <td style={stylingObject.td}>
            <strong>{minToFuel.toFixed(1)}</strong>
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
          <td
            style={stylingObject.td}
            className={extraFuel > 0 ? 'text-success' : 'text-error'}
            colSpan='2'
          >
            Extra
          </td>
          <td
            style={stylingObject.td}
            className={extraFuel > 0 ? 'text-success' : 'text-error'}
          >
            {extraFuel > 0
              ? dayjs
                  .duration(extraFuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '-' +
                dayjs
                  .duration(-extraFuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)}
          </td>
          <td
            style={stylingObject.td}
            className={extraFuel > 0 ? 'text-success' : 'text-error'}
          >
            {extraFuel.toFixed(1)}
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
                  .duration(toFuel / basicData.fuelConsumption, 'hours')
                  .format(timeFormat)
              : '00:00'}
          </td>
          <td style={stylingObject.td}>{toFuel}</td>
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
              onChange={(e) => {
                setBasicData({ ...basicData, [e.target.name]: e.target.value })
                dispatch({
                  type: 'RECALCULATE_FUEL',
                  payload: {
                    rampFuel: e.target.value,
                    fuelConsumption: basicData.fuelConsumption,
                    taxiFuel: taxiFuel,
                  },
                })
              }}
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
