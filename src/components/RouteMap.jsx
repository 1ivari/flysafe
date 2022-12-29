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
	const { route, lockRoute } = useContext(AppContext)

	const [keys, setKeys] = useState([])

	// Initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [21.48, 61.76],
			zoom: 5,
			projection: 'globe',
		})

		// Add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), 'top-right')

		setMap(map)

		// Clean up on unmount
		return () => {
			setKeys([])
			map.remove()
		}
	}, [])

	// add marker to every item in route
	useEffect(() => {
		if (map) {
			if (route.length > 0) {
				map.addSource(route[route.length - 1].key, {
					type: 'geojson',
					data: route[route.length - 1].geoJSON,
				})
				console.log('source added')

				map.addLayer({
					id: route[route.length - 1].key,
					source: route[route.length - 1].key,
					type: 'circle',
				})

				if (route.length === 1) {
					setKeys([route[route.length - 1].key])
				}
			}

			if (route.length > 1) {
				map.addSource(route[route.length - 1].key + 'line', {
					type: 'geojson',
					data: greatCircle(
						route[route.length - 2].geoJSON,
						route[route.length - 1].geoJSON
					),
				})
				map.addLayer({
					id: route[route.length - 1].key + 'line',
					source: route[route.length - 1].key + 'line',
					type: 'line',
					paint: {
						'line-color': '#ff0000',
						'line-width': 2,
					},
				})
				setKeys([
					...keys,
					route[route.length - 1].key,
					route[route.length - 1].key + 'line',
				])
			}

			// remove markers from map if route is empty
			if (route.length === 0) {
				keys.map((key) => {
					map.removeLayer(key)
					map.removeSource(key)
				})
				setKeys([])
			}
		}
	}, [route])

	return (
		<>
			<div className='map-container' ref={mapContainerRef} />
		</>
	)
}

export default RouteMap
