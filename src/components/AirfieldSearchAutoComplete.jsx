import { useContext, useState, useEffect, useRef } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AppContext from '../context/AppContext.jsx'
import airports from '../data/Airports.json'

import classNames from 'classnames'
import useFetchJson from '../hooks/useFetchJson.jsx'
import useFetchMetar from '../hooks/useFetchMetar.jsx'

import AirfieldCard from './AirfieldCard.jsx'

function AirfieldSearchAutoComplete() {
	// Get route state and setRoute function from AppContext
	// Route is an array of objects, each object is an airfield in geoJSON format
	// Route is used later on to generate OFP
	const { route, setRoute, clearOfp, lockRoute, setLockRoute } =
		useContext(AppContext)

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
	const { data, error, loading } = useFetchJson(url)
	// Fetches metar data from met.no
	const { metar, metError, metLoading } = useFetchMetar(metarUrl)

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

	const ref = useRef(null)
	const [open, setOpen] = useState(false)

	const handleOnSearch = (string, results) => {
		// onSearch will have as the first callback parameter
		// the string searched and for the second the results.
	}

	const handleOnHover = (result) => {
		// the item hovered
		// setQuery(result.ident)
	}

	const handleOnSelect = (item) => {
		// the item selected
		// if (data && !loading && !metLoading) {
		// 	setRoute([
		// 		...route,
		// 		{
		// 			key: crypto.randomUUID(),
		// 			geoJSON: {
		// 				type: 'Feature',
		// 				geometry: {
		// 					type: 'Point',
		// 					coordinates: [data.longitude_deg, data.latitude_deg],
		// 				},
		// 				properties: { ...data, metars: metar },
		// 			},
		// 		},
		// 	])
		// }
		setQuery(item.ident)
	}

	const handleOnFocus = () => {
		console.log('Focused')
	}

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
			<div className='grid w-80 grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 mb-8 gap-8'>
				<div>
					<div className='relative'>
						<ReactSearchAutocomplete
							items={airports}
							fuseOptions={{ keys: ['name', 'ident'], minMatchCharLength: 3 }}
							onSearch={handleOnSearch}
							onHover={handleOnHover}
							onSelect={handleOnSelect}
							onFocus={handleOnFocus}
							autoFocus
							formatResult={formatResult}
							placeholder='Search for an airport'
						/>
					</div>

					{loading && metLoading && <h1>Loading... </h1>}
				</div>
				<div>
					{route.map((poi, idx) => {
						return (
							<div key={idx} className='pt-2'>
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
		</>
	)
}

export default AirfieldSearchAutoComplete
