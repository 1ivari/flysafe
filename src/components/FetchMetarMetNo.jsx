import { useContext } from 'react'
import AppContext from '../context/AppContext'

function FetchMetarMetNo() {
  const { metarData } = useContext(AppContext)

  return (
    <>
      <ul>
        {metarData.map((item, idx) => {
          return (
            <li key={idx} className='text-slate-600 text-white p-2'>
              {item}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default FetchMetarMetNo
