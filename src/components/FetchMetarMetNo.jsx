import { useContext } from 'react'
import AppContext from '../context/AppContext'

function FetchMetarMetNo() {
  const { metarData } = useContext(AppContext)

  return (
    <>
      <ul>
        {metarData.map((item, idx) => {
          return item.metars.map((metar, i) => {
            return (
              <li key={i} className='text-slate-600 text-white p-2'>
                {metar}
              </li>
            )
          })
        })}
      </ul>
    </>
  )
}

export default FetchMetarMetNo
