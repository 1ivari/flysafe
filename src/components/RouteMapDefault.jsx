import React, { useRef, useEffect, useState, useContext } from 'react'

import mapboxgl from '!mapbox-gl'
import AppContext from '../context/AppContext'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = MAPBOX_TOKEN

export default function RouteMapDefault() {
	const mapContainer = useRef(null)
	const map = useRef(null)
	const [lng, setLng] = useState(-70.9)
	const [lat, setLat] = useState(42.35)
	const [zoom, setZoom] = useState(9)

	useEffect(() => {
		if (map.current) return // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [lng, lat],
			zoom: zoom,
		})
	})

	useEffect(() => {
		if (!map.current) return // wait for map to initialize
		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4))
			setLat(map.current.getCenter().lat.toFixed(4))
			setZoom(map.current.getZoom().toFixed(2))
		})
	})

	return (
		<div>
			<div className='sidebar'>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</div>
			<div ref={mapContainer} className='map-container' />
		</div>
	)
}
