import React from 'react'
import { useContext } from 'react'
import AppContext from '../../context/AppContext'

function RadioFrequencyTable() {
  const { ofp, route } = useContext(AppContext)
  let longest = 0
  let longestId = ''
  const freqs = route.map((item) => {
    let apFreqs = item.geoJSON.properties.freqs
    if (apFreqs.length > longest) {
      longest = apFreqs.length
      longestId = item.key
    }
    return { freq: apFreqs, key: item.key }
  })
  console.log(freqs)

  return (
    <>
      <div className='flex justify-evenly h-40'>
        <table className='table table-compact'>
          <thead>
            <tr>
              {freqs.map((arr) => {
                if (arr.key === longestId) {
                  return arr.freq.map((item) => {
                    console.log(item.description)
                    return <th className='w-40'>{item.description}</th>
                  })
                }
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>morotttt</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default RadioFrequencyTable
