import { useContext, useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import AppContext from '../context/AppContext.jsx'
import airports from '../data/Airports.json'

import useFetchJson from '../hooks/useFetchJson.jsx'
import useFetchMetar from '../hooks/useFetchMetar.jsx'
import useRouteConstructor from '../hooks/useRouteConstructor.jsx'

import AirfieldCard from './AirfieldCard.jsx'

import distance from '@turf/distance'
import bearing from '@turf/bearing'
import * as geomag from 'geomag'

import calcTimev2 from '../utils/calcTimev2.js'

// TODO:
// 1. fix bug that causes the search to not work after the first search if user tries to search for the same airport again
// 2. consider calculating total distance of route and displaying it somewhere

function AirfieldSearchAutoComplete() {
	// Query state for search input
	const [query, setQuery] = useState(null)

	// Urls for fetching data from airportdb and met.no
	const [url, setUrl] = useState(null)
	const [metarUrl, setMetarUrl] = useState(null)

	// get route and setRoute from AppContext
	const { route, setRoute, ofp, dispatch, basicData } = useContext(AppContext)

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
	// constructs route state. UseEffect runs every time loading or metLoading changes
	// const { route } = useRouteConstructor(data, metar, loading, metLoading)
	useEffect(() => {
		if (data && metar && !loading && !metLoading) {
			setRoute((prevRoute, props) => {
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
						...route,
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
	}, [data, metar, loading, metLoading])

	// Effect that will run every time route changes
	// for each item in route, generate row in ofp
	useEffect(() => {
		dispatch({
			type: 'CLEAR',
		})

		let sumDistance = 0
		if (route.length > 0) {
			route.forEach((poi, i, arr) => {
				console.log('start:')
				const properties = poi.geoJSON.properties
				console.log('arr: ', arr)
				console.log('poi: ', poi)
				console.log('i: ', i)
				const desc =
					i > 0
						? arr[i - 1].geoJSON.properties.ident + ' -> ' + properties.ident
						: 'DEP: ' + properties.ident

				const dist =
					i > 0
						? Number(
								distance(arr[i - 1].geoJSON, poi.geoJSON, {
									units: 'nauticalmiles',
								}).toFixed(1)
						  )
						: Number(0)
				console.log('dist: ', dist)
				sumDistance += dist
				console.log('sumDistance: ', sumDistance)
				const loc = poi.geoJSON.geometry.coordinates
				const magVar = geomag.field(loc[1], loc[0])
				console.log('magVar: ', magVar.declination)

				const trueCourse180 =
					i > 0
						? Number(
								bearing(
									arr[i - 1].geoJSON.geometry,
									poi.geoJSON.geometry
								).toFixed(0)
						  )
						: Number(0)

				const trueCourse360 =
					trueCourse180 < 0 ? trueCourse180 + 360 : trueCourse180
				console.log('trueCourse360: ', trueCourse360)

				const tas = basicData.defaultTas

				const time = calcTimev2(dist, tas)
				console.log('time: ', time)
				const timeAcc = calcTimev2(sumDistance, tas)
				console.log('timeAcc: ', timeAcc)

				dispatch({
					type: 'ADD_ROW',
					payload: {
						key: poi.key,
						description: desc,
						distInt: dist,
						distAcc: sumDistance.toFixed(1),
						var: magVar.declination.toFixed(1),
						tc: trueCourse360,
						tas: tas,
						timeInt: time,
						timeAcc: timeAcc,
					},
				})
			})
		}
		console.log('route now: ', route)
		console.log('ofp now: ', ofp)
	}, [route])

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
