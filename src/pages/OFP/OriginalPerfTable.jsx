import React, { useState, useEffect } from 'react'
import constants from '../../utils/constants'

function OriginalPerfTable() {
  const [temp, setTemp] = useState(3)
  const [alt, setAlt] = useState(0)
  const [toDist, setToDist] = useState(1390)
  const [ldgDist, setLdgDist] = useState(1215)

  const toPerf = [
    {
      presAlt: 0,
      distance: [1190, 1290, 1390, 1495, 1605],
    },
    {
      presAlt: 1000,
      distance: [1310, 1420, 1530, 1645, 1770],
    },
    {
      presAlt: 2000,
      distance: [1445, 1565, 1690, 1820, 1960],
    },
    {
      presAlt: 3000,
      distance: [1600, 1730, 1870, 2020, 2185],
    },
    {
      presAlt: 4000,
      distance: [1775, 1920, 2080, 2250, 2440],
    },
    {
      presAlt: 5000,
      distance: [1970, 2140, 2320, 2525, 2750],
    },
    {
      presAlt: 6000,
      distance: [2200, 2395, 2610, 2855, 3125],
    },
    {
      presAlt: 7000,
      distance: [2470, 2705, 2960, 3255, 3590],
    },
    {
      presAlt: 8000,
      distance: [2800, 3080, 3395, 3765, 4195],
    },
  ]

  const ldgPerf = [
    {
      presAlt: 0,
      distance: [1160, 1185, 1215, 1240, 1265],
    },
    {
      presAlt: 1000,
      distance: [1185, 1215, 1240, 1270, 1295],
    },
    {
      presAlt: 2000,
      distance: [1215, 1240, 1270, 1300, 1330],
    },
    {
      presAlt: 3000,
      distance: [1240, 1275, 1305, 1335, 1360],
    },
    {
      presAlt: 4000,
      distance: [1275, 1305, 1335, 1370, 1400],
    },
    {
      presAlt: 5000,
      distance: [1305, 1335, 1370, 1400, 1435],
    },
    {
      presAlt: 6000,
      distance: [1340, 1370, 1410, 1440, 1475],
    },
    {
      presAlt: 7000,
      distance: [1375, 1410, 1440, 1480, 1515],
    },
    {
      presAlt: 8000,
      distance: [1410, 1450, 1480, 1520, 1555],
    },
  ]

  // useEffect(() => {
  //   setToDist(
  //     toPerf.filter((obj) => obj.presAlt === Number(alt))[0].distance[temp]
  //   )
  //   setLdgDist(
  //     ldgPerf.filter((obj) => obj.presAlt === Number(alt))[0].distance[temp]
  //   )

  //   console.log(toDist, ldgDist)
  // }, [alt, temp])
  const onChange = (e) => {
    const res = toPerf.filter((obj) => obj.presAlt === 1000)
  }

  return (
    <>
      <div id='perfTable' className='flex flex-col'>
        <table className='table table-compact text-center'>
          <thead>
            <th>Pressure Alt</th>
            <th>Wind Vel.</th>
            <th>Wind Dir.</th>
            <th>Temperature</th>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  className='select select-primary select-xs w-full max-w-xs'
                  onChange={(e) => {
                    setToDist(
                      toPerf.filter(
                        (obj) => obj.presAlt === Number(e.target.value)
                      )[0].distance[temp]
                    )
                    setLdgDist(
                      ldgPerf.filter(
                        (obj) => obj.presAlt === Number(e.target.value)
                      )[0].distance[temp]
                    )
                    setAlt(e.target.value)
                  }}
                >
                  <option value={0}>S.L.</option>
                  <option value={1000}>1000 ft</option>
                  <option value={2000}>2000 ft</option>
                  <option value={3000}>3000 ft</option>
                  <option value={4000}>4000 ft</option>
                  <option value={5000}>5000 ft</option>
                  <option value={6000}>6000 ft</option>
                  <option value={7000}>7000 ft</option>
                  <option value={8000}>8000 ft</option>
                </select>
              </td>
              <td>
                <select
                  className='select select-primary select-xs w-full max-w-xs'
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value={0}>0</option>
                </select>
              </td>
              <td>
                <select
                  className='select select-primary select-xs w-full max-w-xs'
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value={0}>0</option>
                </select>
              </td>
              <td>
                <select
                  className='select select-primary select-xs w-full max-w-xs'
                  onChange={(e) => {
                    setToDist(
                      toPerf.filter((obj) => obj.presAlt === Number(alt))[0]
                        .distance[e.target.value]
                    )
                    setLdgDist(
                      ldgPerf.filter((obj) => obj.presAlt === Number(alt))[0]
                        .distance[e.target.value]
                    )
                    setTemp(e.target.value)
                  }}
                >
                  <option value={0}>0°C</option>
                  <option value={1}>10°C</option>
                  <option value={2} selected>
                    20°C
                  </option>
                  <option value={3}>30°C</option>
                  <option value={4}>40°C</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table className='table table-compact'>
          <thead>
            <th>Airport Performance</th>
            <th>Performance</th>
            <th>Requirement</th>
          </thead>
          <tbody>
            <tr>
              <td>T/O Distance</td>
              <td>
                {(toDist * constants.FEET_TO_METERS).toFixed(0)}m ({toDist} ft)
              </td>
              <td>
                {(toDist * 1.25 * constants.FEET_TO_METERS).toFixed(0)}m (
                {(toDist * 1.25).toFixed(0)} ft)
              </td>
            </tr>
            <tr>
              <td>LDG Distance</td>
              <td>
                {(ldgDist * constants.FEET_TO_METERS).toFixed(0)}m ({ldgDist}{' '}
                ft)
              </td>
              <td>
                {(ldgDist * 1.45 * constants.FEET_TO_METERS).toFixed(0)}m (
                {(ldgDist * 1.45).toFixed(0)} ft)
              </td>
            </tr>
            <tr>
              <td>TGL Distance</td>
              <td>
                {((toDist + ldgDist) * constants.FEET_TO_METERS).toFixed(0)}m (
                {toDist + ldgDist} ft)
              </td>
              <td>
                {((toDist + ldgDist) * constants.FEET_TO_METERS).toFixed(0)}m (
                {toDist + ldgDist} ft)
              </td>
            </tr>
            <tr>
              <td>
                <div className='form-control'>
                  <label className='input-group'>
                    <span>IM SAFE</span>
                    <input
                      type='checkbox'
                      className='checkbox checkbox-primary'
                    />
                  </label>
                </div>
              </td>
              <td></td>
              <td>
                <div className='form-control'>
                  <label className='input-group'>
                    <span>PAVE</span>
                    <input
                      type='checkbox'
                      className='checkbox checkbox-primary'
                    />
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className='table table-compact text-center'>
          <thead>
            <th colSpan={4}>Weather Minima</th>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Take-Off</td>
              <td>Route</td>
              <td>Destination</td>
            </tr>
            <tr>
              <td>Plan</td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
            </tr>
            <tr>
              <td>Ops</td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
              <td>
                <input
                  type='text'
                  value={'1500m, 600ft'}
                  className='input input-primary input-xs w-24'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OriginalPerfTable
