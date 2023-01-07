import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

function OriginalTableStyleBasicData() {
  const { basicData, route } = useContext(AppContext)
  return (
    <>
      <table
        id='ofpTable'
        className='table table-compact tablestyleofp text-center max-w-5xl'
      >
        <thead>
          <tr>
            <th className='w-40'>Date</th>
            <th className='w-40'>From</th>
            <th className='w-40'>To</th>
            <th className='w-40'>Pob</th>
            <th className='w-40'>Out</th>
            <th className='w-40'>Off</th>
            <th className='w-40'>On</th>
            <th className='w-40'>In</th>
            <th className='w-40'>Air</th>
            <th className='w-40'>Block</th>
          </tr>
        </thead>
        <tbody>
          <tr className='hover h-12'>
            <td>{basicData.date}</td>
            <td>{route[0].geoJSON.properties.ident}</td>
            <td>{route[route.length - 1].geoJSON.properties.ident}</td>
            <td>{basicData.pob}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className='hover h-12'>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className='table table-compact'>
        <thead>
          <th colSpan='6' className='text-center'>
            Operational flight plan
          </th>
        </thead>
        <tbody>
          <tr>
            <td>OH-CIS</td>
            <td>Type:</td>
            <td>C152</td>
            <td>Rules:</td>
            <td className='uppercase'>{basicData.rules}</td>
          </tr>
          <tr>
            <td>Crew</td>
            <td colSpan='4'></td>
          </tr>
          <tr>
            <td>Signature</td>
            <td colSpan='4'></td>
          </tr>
        </tbody>
      </div>
    </>
  )
}

export default OriginalTableStyleBasicData
