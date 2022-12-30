import React, { useRef, useEffect, useState, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import AppContext from '../context/AppContext'

import greatCircle from '@turf/great-circle'
// import point from '@turf/point'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

mapboxgl.accessToken = MAPBOX_TOKEN
const RouteMap = () => {
	const mapContainerRef = useRef(null)
	const [map, setMap] = useState(null)
	const [projection, setProjection] = useState('globe')
	const { route, lockRoute } = useContext(AppContext)

	const [keys, setKeys] = useState([])

	// Initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [21.48, 61.76],
			zoom: 5,
			projection: projection,
		})

		// Add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'top-right')

		setMap(map)

		// Clean up on unmount
		return () => {
			setKeys([])
			map.remove()
		}
	}, [projection])

	// add marker to every item in route
	useEffect(() => {
		if (map) {
			// clear all old keys from map
			keys.map((key, idx) => {
				map.removeLayer(key)
				map.removeSource(key)
			})

			// set new key array to empty
			var newKeys = []

			route.map((poi, idx, arr) => {
				map.addSource(poi.key, {
					type: 'geojson',
					data: poi.geoJSON,
				})
				map.addLayer({
					id: poi.key,
					source: poi.key,
					type: 'circle',
				})
				newKeys.push(poi.key)
				if (idx > 0) {
					map.addSource(poi.key + 'line', {
						type: 'geojson',
						data: greatCircle(arr[idx - 1].geoJSON, poi.geoJSON),
					})
					map.addLayer({
						id: poi.key + 'line',
						source: poi.key + 'line',
						type: 'line',
						paint: {
							'line-color': '#ff0000',
							'line-width': 2,
						},
					})
					newKeys.push(poi.key + 'line')
				}

				setKeys(newKeys)
			})
		}

		return () => {
			setKeys([])
		}
	}, [route])

	const toggleProjection = () => {
		if (map) {
			if (projection === 'globe') {
				setProjection('mercator')
			} else {
				setProjection('globe')
			}
		}
	}

	return (
		<>
			<div className='map-container' ref={mapContainerRef} />
			<button onClick={toggleProjection} className='btn'>
				projection
			</button>
		</>
	)
}

export default RouteMap
