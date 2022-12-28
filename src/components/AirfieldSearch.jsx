import { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../context/AppContext.jsx'
import validIcaoIdents from '../data/validIcaoIdents.js'

import classNames from 'classnames'

function AirfieldSearch() {
  // Get route state and setRoute function from AppContext
  // Route is an array of objects, each object is an airfield
  // Route is used later on to generate OFP
  const { route, setRoute, clearOfp, metarData, setMetarData } =
    useContext(AppContext)
  // Ap is an object, it is the airfield data returned from airportdb
  // Ap is used to add airfield to route state
  const [ap, setAp] = useState()
  // Ident is the ICAO ident of the airfield
  const [ident, setIdent] = useState('')

  // Search Results for autocomplete
  const [searchRes, setSearchRes] = useState([])

  // Checks if input is valid ICAO ident
  const checkIfValidIdent = (ident) => {
    return validIcaoIdents.idents.includes(ident)
  }

  // Runs every time isValidIdent changes (i.e. when ValidIdent is set)
  // First check that input is valid ICAO ident
  // Then fetch data from airportdb
  // if not found, set ap state to empty string
  useEffect(() => {
    if (checkIfValidIdent(ident)) {
      fetch(
        `${process.env.REACT_APP_AIRPORTDB_URL}${ident}?apiToken=${process.env.REACT_APP_AIRPORTDB_TOKEN}`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(
              'Could not fetch data from API. Returned with status ' +
                res.status
            )
          }
          return res.json()
        })
        .catch((err) => {
          alert(err.message)
        })
        .then((data) => setAp(data))
    } else setAp('')
  }, [ident])

  // Gets called every time user types in search box
  const handleIdentChange = (e) => {
    e.preventDefault()
    // Filter valid ICAO idents with startsWith
    const arr = validIcaoIdents.idents.filter((str) => {
      return str.startsWith(e.target.value.toUpperCase())
    })
    // Set searchRes state to first 5 results
    setSearchRes(arr.slice(0, 5))
    arr.length === 1 ? setIdent(e.target.value.toUpperCase()) : setIdent('')
  }

  // Gets called when user clicks 'Go' button. Adds ap to route state
  function handleSetRoute(e) {
    e.preventDefault()
    // Check if ap is valid, this is needed in case fetch fails and ap is empty
    checkIfValidIdent(ident) && ap
      ? setRoute([...route, ap])
      : alert('Invalid ICAO ident')
  }

  // Gets called when user clicks 'Clear' button. Clears route state and OFP
  function clearRoute(e) {
    e.preventDefault()
    setRoute([])
    clearOfp()
    setMetarData([])
  }

  // This useEffect runs every time route state changes
  // It fetches METAR data from met.no API
  // It pushes the last 5 METARs to a metars array inside metarData state
  useEffect(() => {
    var path = `https://api.met.no/weatherapi/tafmetar/1.0/?icao=${ident}&content_type=text/xml&offset=+02:00&content=tafmetar`
    console.log(path)
    var arr = []
    if (checkIfValidIdent(ident)) {
      fetch(path)
        .then((res) => res.text())
        .then((data) => {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(data, 'text/xml')
          const metars = xmlDoc.querySelectorAll('metarText')

          metars.forEach((metar, idx) => {
            if (idx > metars.length - 6) {
              arr.push(metar.textContent)
            }
          })
          setMetarData([
            ...metarData,
            { key: crypto.randomUUID(), ident: ident, metars: arr },
          ])
        })
    }
  }, [route])

  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
          <form action=''>
            <div className='form-control'>
              <div className='relative'>
                <div
                  className={classNames({
                    'dropdown w-full': true,
                    'dropdown-open': open,
                  })}
                  ref={ref}
                >
                  <input
                    type='text'
                    className='w-full pr-30 bg-gray-200 input input-sm text-black'
                    placeholder='Search...'
                    onChange={handleIdentChange}
                  />
                  <div className='dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md'>
                    <ul
                      className='menu menu-compact'
                      style={{ width: ref.current?.clientWidth }}
                    >
                      {searchRes.map((res, idx) => {
                        return (
                          <li
                            key={idx}
                            className='border-b border-b-base-content/10 w-full'
                          >
                            {res}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
                <button
                  className='absolute top-0 right-0 rounded-l-none w-8 btn btn-sm'
                  type='submit'
                  onClick={handleSetRoute}
                >
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <button className='ml-4 btn btn-ghost btn-sm' onClick={clearRoute}>
            Clear
          </button>
          <ul id='result' className='menu'>
            {route.map((poi, idx) => {
              return <li key={idx}>{poi.name}</li>
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default AirfieldSearch
