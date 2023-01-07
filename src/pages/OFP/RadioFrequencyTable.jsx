import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

function RadioFrequencyTable() {
  const { ofp, route } = useContext(AppContext)
  let longest = 0
  let longestId = ''

  const freqs = route.map((item) => {
    const apFreqs = item.geoJSON.properties.freqs
    let atis = apFreqs.find((item) => item.type === 'ATIS')
    if (typeof atis === 'undefined') {
      atis = 'N/A'
    } else atis = atis.frequency_mhz

    let app = apFreqs.find((item) => item.type === 'APP')
    if (typeof app === 'undefined') {
      app = 'N/A'
    } else app = app.frequency_mhz

    let twr = apFreqs.find((item) => item.type === 'TWR')
    if (typeof twr === 'undefined') {
      twr = 'N/A'
    } else twr = twr.frequency_mhz

    let traffic = apFreqs.find((item) => item.type === 'RDO')
    if (typeof traffic === 'undefined') {
      traffic = 'N/A'
    } else traffic = traffic.frequency_mhz

    return {
      key: item.key,
      ident: item.geoJSON.properties.ident,
      atis: atis,
      app: app,
      twr: twr,
      traffic: traffic,
      allLoaded: apFreqs.length < 5 ? true : false,
    }
  })

  console.log('freqs', freqs)

  return (
    <>
      <table className='table table-compact'>
        <thead>
          <tr>
            <th className=''>Radio</th>
            <th className=''>ATIS</th>
            <th className=''>APP</th>
            <th className=''>TWR</th>
            <th className=''>TRAFFIC</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {freqs.map((item) => {
            return (
              <tr key={item.key} className='hover'>
                <td>{item.ident}</td>
                <td>{item.atis}</td>
                <td>{item.app}</td>
                <td>{item.twr}</td>
                <td>{item.traffic}</td>
                <td>
                  {item.allLoaded ? (
                    <FontAwesomeIcon color='green' icon={faCircleCheck} />
                  ) : (
                    <>
                      <div
                        className='tooltip'
                        data-tip='Some data likely missing.'
                      >
                        <FontAwesomeIcon
                          color='red'
                          icon={faCircleExclamation}
                        />
                      </div>
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default RadioFrequencyTable
