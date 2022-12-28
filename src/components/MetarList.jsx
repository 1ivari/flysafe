import { useContext } from 'react'
import AppContext from '../context/AppContext'

// crypto.randomUUID()
function MetarList() {
  const { metarData } = useContext(AppContext)

  return (
    <>
      {metarData.map((obj, idx) => {
        return (
          <div key={obj.key} className='text-white'>
            <h1>Location: {obj.ident}</h1>
            <ul>
              {obj.metars.map((metar, i) => {
                return (
                  <li key={i} className='text-white'>
                    {metar}
                  </li>
                )
              })}
            </ul>
            <div>---</div>
          </div>
        )
      })}
    </>
  )
}

export default MetarList
