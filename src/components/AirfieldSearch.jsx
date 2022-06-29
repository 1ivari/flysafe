import { useContext, useState, useEffect } from 'react'
import AppContext from '../context/AppContext.jsx'
import icao from '../data/icao.json'

function AirfieldSearch() {
  const { route, setRoute } = useContext(AppContext)
  const [ap, setAp] = useState()
  const [ident, setIdent] = useState()
  const searchList = []

  const handleSearch = (e) => {
    e.preventDefault()
    setRoute([...route, ap])
  }

  // this uses icao.json saved in ../data
  const handleChange = (e) => {
    e.preventDefault()
    const res = icao.filter((ap) =>
      ap.ident.includes(e.target.value.toUpperCase())
    )
    searchList.push(res.slice(0, 5))
    setIdent(e.target.value)
    // setAp(res[0])
  }

  // useEffect(() => {
  //   fetchAirfield()
  // }, [])

  const fetchAirfield = async (searchVal) => {
    const response = await fetch(
      `${
        process.env.REACT_APP_AIRPORTDB_URL
      }${searchVal.toUpperCase()}?apiToken=${
        process.env.REACT_APP_AIRPORTDB_TOKEN
      }`
    )
    const data = await response.json()
    setRoute([...route, data])
    return data
  }

  const handleSearch2 = (e) => {
    e.preventDefault()
    console.log('ap2 value on')
    const ap2 = fetchAirfield(ident)
    console.log(ap2)
    setRoute([...route, ap2])
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form action=''>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-30 bg-gray-200 input input-sm text-black'
                placeholder='Search'
                onChange={handleChange}
              />
              <button
                className='absolute top-0 right-0 rounded-l-none w-8 btn btn-sm'
                type='submit'
                onClick={handleSearch2}
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button className='ml-4 btn btn-ghost btn-sm'>Clear</button>
      </div>

      <div className=''>
        <ul id='result' className='menu'>
          {searchList.map((ap, idx) => {
            return <li key={idx}>{ap[0].name}</li>
          })}
          tähä pitäs tulla lista {searchList.ident}
        </ul>
      </div>

      <ul id='result' className='menu'>
        {route.map((poi, idx) => {
          return <li key={idx}>{poi.name}</li>
        })}
      </ul>
    </div>
  )
}

export default AirfieldSearch
