import { useContext, useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AppContext from '../context/AppContext.jsx'
import airports from '../data/Airports.json'

import useFetchJson from '../hooks/useFetchJson.jsx'
import useFetchMetar from '../hooks/useFetchMetar.jsx'

import AirfieldCard from './AirfieldCard.jsx'

import distance from '@turf/distance'

// TODO:
// 1. fix bug that causes the search to not work after the first search if user tries to search for the same airport again
// 2. consider calculating total distance of route and displaying it somewhere

function AirfieldSearchAutoComplete() {
	// Get route state and setRoute function from AppContext
	// Route is an array of objects, each object is an airfield in geoJSON format
	// Route is used later on to generate OFP
	const { route, setRoute } = useContext(AppContext)

	// Query state for search input
	const [query, setQuery] = useState(null)

	// Urls for fetching data from airportdb and met.no
	const [url, setUrl] = useState(null)
	const [metarUrl, setMetarUrl] = useState(null)

	// Runs every time query changes
	// Checks if query is valid ICAO ident and sets url for fetching data from airportdb and met.no
	useEffect(() => {
		if (query) {
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
		}
	}, [query])

	// Fetches data from airportdb
	const { data, loading } = useFetchJson(url)
	// Fetches metar data from met.no
	const { metar, metLoading } = useFetchMetar(metarUrl)

	// Runs every time data and metar are fetched
	// Adds fetched data to route state
	useEffect(() => {
		if (data && metar && !loading && !metLoading) {
			setRoute([
				...route,
				{
					key: crypto.randomUUID(),
					geoJSON: {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [data.longitude_deg, data.latitude_deg],
						},
						properties: { ...data, metars: metar },
					},
				},
			])
		}
	}, [data, metar])

	const handleOnSearch = (string, results) => {
		// onSearch will have as the first callback parameter
		// the string searched and for the second the results.
	}

	const handleOnHover = (result) => {
		// the item hovered
		// setQuery(result.ident)
	}

	const handleOnSelect = (item) => {
		setQuery(item.ident)
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
							items={airports}
							fuseOptions={{ keys: ['name', 'ident'], minMatchCharLength: 3 }}
							onSearch={handleOnSearch}
							onHover={handleOnHover}
							onSelect={handleOnSelect}
							onFocus={handleOnFocus}
							formatResult={formatResult}
							maxResults={5}
							placeholder='Search for an airport'
						/>
					</div>

					{loading && metLoading && <h1>Loading... </h1>}
				</div>

				{route.length > 0 ? (
					<div
						tabIndex={0}
						className='collapse collapse-arrow border border-base-300 rounded-box bg-base-100 mt-2'>
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
