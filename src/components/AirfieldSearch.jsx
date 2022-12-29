import { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../context/AppContext.jsx'
import validIcaoIdents from '../data/validIcaoIdents.js'

import classNames from 'classnames'
import useFetchJson from '../hooks/useFetchJson.jsx'
import useFetchMetar from '../hooks/useFetchMetar.jsx'

function AirfieldSearch() {
	// Get route state and setRoute function from AppContext
	// Route is an array of objects, each object is an airfield in geoJSON format
	// Route is used later on to generate OFP
	const { route, setRoute, clearOfp } = useContext(AppContext)

	// Query state for search input
	const [query, setQuery] = useState('')

	// Urls for fetching data from airportdb and met.no
	const [url, setUrl] = useState(null)
	const [metarUrl, setMetarUrl] = useState(null)

	// utility function to check if input is valid ICAO ident
	const checkIfValidIdent = (ident) => {
		return validIcaoIdents.idents.includes(ident.toUpperCase())
	}

	// Runs every time query changes
	// Checks if query is valid ICAO ident and sets url for fetching data from airportdb and met.no
	useEffect(() => {
		if (checkIfValidIdent(query.toUpperCase())) {
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
	const { data, error, isLoading } = useFetchJson(url)
	// Fetches metar data from met.no
	const { metar, metError, metLoading } = useFetchMetar(metarUrl)

	// Filtered idents for search results
	const filteredIdents = validIcaoIdents.idents
		.filter((item) => {
			return item.toUpperCase().includes(query.toUpperCase())
		})
		.slice(0, 5)

	// Gets called when user submits search form (clicks 'Add' button) or presses enter
	function handleSetRoute(e) {
		e.preventDefault()
		// Ensures fetch is not loading
		// constructs geoJSON object and adds it to route state
		// also adds metar data to metar state
		if (checkIfValidIdent(query.toUpperCase())) {
			if (!isLoading && !metLoading) {
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
			} else alert('Query not ready yet.')
		} else alert('Invalid ICAO ident.')
	}

	// Gets called when user clicks 'Clear' button. Clears route state and OFP
	function clearRoute(e) {
		e.preventDefault()
		setRoute([])
		clearOfp()
	}

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
									ref={ref}>
									<input
										type='text'
										value={query}
										className='w-full pr-30 bg-gray-200 input input-sm text-black'
										placeholder='Search...'
										onChange={(e) => setQuery(e.target.value)}
									/>
									<div className='dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md'>
										<ul
											className='menu menu-compact'
											style={{ width: ref.current?.clientWidth }}>
											{filteredIdents.map((res, idx) => {
												return (
													<li
														key={idx}
														className='border-b border-b-base-content/10 w-full'>
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
									onClick={handleSetRoute}>
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
							return (
								<li key={idx}>
									{idx + 1} {poi.geoJSON.properties.ident} -{' '}
									{poi.geoJSON.properties.name}
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</>
	)
}

export default AirfieldSearch
