import React, { useRef, useEffect, useState, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import AppContext from '../context/AppContext'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

mapboxgl.accessToken = MAPBOX_TOKEN
const RouteMap = () => {
  const mapContainerRef = useRef(null)
  const [map, setMap] = useState(null)
  const { route, setRoute } = useContext(AppContext)

  const [markers, setMarkers] = useState([])

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
    return () => map.remove()
  }, [])

  // add marker to every item in route
  useEffect(() => {
    if (map) {
      route.map((wpt, idx) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([wpt.longitude_deg, wpt.latitude_deg])
          .addTo(map)
        setMarkers([...markers, { key: crypto.randomUUID(), marker: marker }])
      })
    }
    // remove markers from map if route is empty
    if (route.length === 0) {
      markers.forEach((item) => {
        item.marker.remove()
      })
      setMarkers([])
    }
  }, [map, route])

  return <div className='map-container' ref={mapContainerRef} />
}

export default RouteMap
