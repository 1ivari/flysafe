import { useContext, useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AppContext from '../../context/AppContext.jsx'
import airports from '../../data/Airports.json'
import vfrRep from '../../data/vfrRep.json'

import useFetchJson from '../../hooks/useFetchJson.jsx'
import useFetchMetar from '../../hooks/useFetchMetar.jsx'
import useUpdateEffect from '../../hooks/useUpdateEffect.jsx'

import AirfieldCard from './AirfieldCard.jsx'

// TODO:
// 1. fix bug that causes the search to not work after the first search if user tries to search for the same airport again
// 2. consider calculating total distance of route and displaying it somewhere

function AirfieldSearchAutoComplete() {
  // Query state for search input
  const [query, setQuery] = useState(null)
  const [queryType, setQueryType] = useState(null)
  const [searchString, setSearchString] = useState('')

  // Urls for fetching data from airportdb and met.no
  const [url, setUrl] = useState(null)
  const [metarUrl, setMetarUrl] = useState(null)

  // get route and setRoute from AppContext
  const { route, setRoute, dispatch, basicData, setBasicData } =
    useContext(AppContext)

  // Runs every time query changes
  // Checks if query is valid ICAO ident and sets url for fetching data from airportdb and met.no
  useEffect(() => {
    if (query) {
      if (queryType !== 'VFR REP') {
        setUrl(
          `${
            process.env.REACT_APP_AIRPORTDB_URL
          }${query.toUpperCase()}?apiToken=${
            process.env.REACT_APP_AIRPORTDB_TOKEN
          }`
        )
        setMetarUrl(
          `https://api.met.no/weatherapi/tafmetar/1.0/?icao=${query.toUpperCase()}&content_type=text/xml&offset=+02:00&content=tafmetar`
        )
      } else {
        let geoJsonData = vfrRep.features.find((item) => {
          return item.properties.name === query
        })
        geoJsonData = {
          ...geoJsonData,
          properties: { ...geoJsonData.properties, ident: query, metars: [] },
        }
        setRoute((prevRoute) => {
          return [
            ...prevRoute,
            {
              key: crypto.randomUUID(),
              geoJSON: geoJsonData,
            },
          ]
        })
      }
    }
  }, [query, queryType, setRoute])

  // Fetches data from airportdb
  const { data, loading } = useFetchJson(url)
  // Fetches metar data from met.no
  const { metar, metLoading } = useFetchMetar(metarUrl)
  // constructs route state. UseEffect runs every time loading or metLoading changes
  useEffect(() => {
    setSearchString('') // reset searchstring
    if (data && metar && !loading && !metLoading) {
      setRoute((prevRoute) => {
        // Check if same poi is added twice in a row
        if (
          prevRoute.length > 0 &&
          prevRoute[prevRoute.length - 1].geoJSON.properties.ident ===
            data.ident
        ) {
          console.log('Cant add the same airport twice in a row')
          return prevRoute
        } else {
          return [
            ...prevRoute,
            {
              key: crypto.randomUUID(),
              geoJSON: {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [data.longitude_deg, data.latitude_deg],
                },
                properties: {
                  ...data,
                  metars: metar,
                },
              },
            },
          ]
        }
      })
    }
  }, [data, metar, loading, metLoading, setRoute])

  // Construct OFP everytime route changes (except on first render)
  useUpdateEffect(() => {
    dispatch({ type: 'CLEAR' })
    if (route.length > 1) {
      dispatch({ type: 'CONSTRUCT_FROM_ROUTE', payload: { obj: route } })
      setBasicData({ ...basicData, type: 'route' })
    } else if (route.length === 1) {
      dispatch({ type: 'CONSTRUCT_LOCAL_FROM_ROUTE', payload: { obj: route } })
      setBasicData({ ...basicData, type: 'local' })
    }
  }, [route])

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setSearchString(string)
  }

  const handleOnHover = (result) => {
    // the item hovered
    // setQuery(result.ident)
  }

  const handleOnSelect = (item) => {
    setQuery(item.ident)
    setQueryType(item.type)
  }

  const handleOnFocus = (e) => {}

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          {item.ident}
        </span>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <>
      <div className='w-80 flex flex-col my-2'>
        <div>
          <div className='relative z-10'>
            <ReactSearchAutocomplete
              items={vfrRep.features
                .map((item) => {
                  return {
                    id: crypto.randomUUID(),
                    ident: item.properties.name,
                    name: item.properties.name,
                    latitude_deg: item.geometry.coordinates[1],
                    longitude_deg: item.geometry.coordinates[0],
                    type: item.properties.type,
                  }
                })
                .concat(airports)}
              fuseOptions={{ keys: ['name', 'ident'], minMatchCharLength: 3 }}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              formatResult={formatResult}
              maxResults={5}
              placeholder='Search for an airport'
              inputSearchString={searchString}
              styling={
                {
                  // backgroundColor: 'red',
                }
              }
            />
          </div>
        </div>

        {route.length > 0 ? (
          <div className='collapse collapse-arrow border border-base-300 rounded-box bg-base-100 mt-2'>
            <input type='checkbox' />
            <div className='collapse-title'>
              {route[0].geoJSON.properties.ident} {' -> '}
              {route[route.length - 1].geoJSON.properties.ident} {route.length}{' '}
              waypoints.
            </div>
            <div className='collapse-content'>
              {route.map((poi, idx) => {
                return (
                  <div key={idx} className='pt-1'>
                    <AirfieldCard
                      toDelete={poi.key}
                      name={poi.geoJSON.properties.name}
                      ident={poi.geoJSON.properties.ident}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default AirfieldSearchAutoComplete
