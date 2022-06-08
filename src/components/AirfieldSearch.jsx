import { useContext, useState } from 'react'
import AppContext from '../context/AppContext.jsx'
import icao from '../data/icao.json'

function AirfieldSearch() {
  const { route, setRoute } = useContext(AppContext)
  const [ap, setAp] = useState()

  const handleSearch = (e) => {
    e.preventDefault()
    setRoute([...route, ap])
    console.log(`route set to ${ap}`)
    console.log(`route looks now like this ${route}`)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const res = icao.filter((ap) =>
      ap.ident.includes(e.target.value.toUpperCase())
    )
    setAp(res)
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form action=''>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                onChange={handleChange}
              />
              <button
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                type='submit'
                onClick={handleSearch}
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button className='btn btn-ghost btn-lg'>Clear</button>
      </div>
      moroo:
      {route.map((ap) => {
        return <div key={ap[0].ident}>{ap[0].name}</div>
      })}
    </div>
  )
}

export default AirfieldSearch
