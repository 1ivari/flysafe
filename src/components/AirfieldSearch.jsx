import { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../context/AppContext.jsx'
import validIcaoIdents from '../data/validIcaoIdents.js'

import classNames from 'classnames'
import useFetchJson from '../hooks/useFetchJson.jsx'

function AirfieldSearch() {
	// Get route state and setRoute function from AppContext
	// Route is an array of objects, each object is an airfield in geoJSON format
	// Route is used later on to generate OFP
	const { route, setRoute, clearOfp, metarData, setMetarData } =
		useContext(AppContext)
	// Ap is an object, it is the airfield data returned from airportdb
	// Ap is used to add airfield to route state
	const [ap, setAp] = useState(null)

	// Query state for search input
	const [query, setQuery] = useState('')

	const [url, setUrl] = useState('')
	const [testState, setTestState] = useState(null)

	// Checks if input is valid ICAO ident
	const checkIfValidIdent = (ident) => {
		return validIcaoIdents.idents.includes(ident.toUpperCase())
	}

	useEffect(() => {
		if (checkIfValidIdent(query.toUpperCase())) {
			setUrl(
				`${
					process.env.REACT_APP_AIRPORTDB_URL
				}${query.toUpperCase()}?apiToken=${
					process.env.REACT_APP_AIRPORTDB_TOKEN
				}`
			)
		} else setUrl('')
	}, [query])

	// Runs every time user writes to query
	// First check that input is valid ICAO ident if not, set ap state to null
	// Then fetch data from airportdb and set ap state to data

	useEffect(() => {
		if (checkIfValidIdent(query)) {
			fetch(
				`${
					process.env.REACT_APP_AIRPORTDB_URL
				}${query.toUpperCase()}?apiToken=${
					process.env.REACT_APP_AIRPORTDB_TOKEN
				}`
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
		} else setAp(null)
	}, [query])

	// Filtered idents for search results
	const filteredIdents = validIcaoIdents.idents
		.filter((item) => {
			return item.toUpperCase().includes(query.toUpperCase())
		})
		.slice(0, 5)

	// Gets called when user submits search form (clicks 'Add' button) or presses enter
	function handleSetRoute(e) {
		e.preventDefault()
		// Check if query is valid and ap is not null
		if (checkIfValidIdent(query) && ap) {
			setRoute([
				...route,
				{
					key: crypto.randomUUID(),
					geoJSON: {
						type: 'Feature',
						geometry: {
							type: 'Point',
							coordinates: [ap.longitude_deg, ap.latitude_deg],
						},
						properties: ap,
					},
				},
			])
		} else alert('Invalid ICAO ident, or query not ready yet.')
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
		var path = `https://api.met.no/weatherapi/tafmetar/1.0/?icao=${query.toUpperCase()}&content_type=text/xml&offset=+02:00&content=tafmetar`
		console.log(path)
		var arr = []
		if (checkIfValidIdent(query)) {
			fetch(path)
				.then((res) => res.text())
				.then((data) => {
					const parser = new DOMParser()
					const xmlDoc = parser.parseFromString(data, 'text/xml')
					const metars = xmlDoc.querySelectorAll('metarText')

					metars.forEach((metar, idx) => {
						if (idx > metars.length - 6) {
							arr.push(metar.textContent.trim())
						}
					})
					setMetarData([
						...metarData,
						{
							key: crypto.randomUUID(),
							ident: query.toUpperCase(),
							metars: arr,
						},
					])
				})
		}
	}, [route.length])

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
