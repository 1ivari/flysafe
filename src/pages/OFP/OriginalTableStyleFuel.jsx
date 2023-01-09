import React from 'react'

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
              className=' input input-xs text-base max-w-xs w-12 text-center'
              defaultValue='36.0'
            />
          </td>
          <td style={stylingObject.td}>1:02</td>
          <td style={stylingObject.td}>
            <input
              className='input input-xs text-base max-w-xs w-12 text-center'
              name=''
              id=''
              defaultValue='37.0'
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
            Taxi
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
            Ramp
          </td>
          <td style={stylingObject.td}></td>
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
      </tbody>
    </div>
  )
}

export default OriginalTableStyleFuel
