import React, { useRef, useEffect, useState, useContext } from 'react'
import mapboxgl from 'mapbox-gl'
import AppContext from '../context/AppContext'

import greatCircle from '@turf/great-circle'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = MAPBOX_TOKEN

const RouteMap = () => {
  const mapContainerRef = useRef(null)
  const { route, map, setMap, mapSettings } = useContext(AppContext)

  const [keys, setKeys] = useState([])

  const addLayers = (map, route, firstLoad) => {
    if (map) {
      // clear all old keys from map
      if (!firstLoad) {
        keys.forEach((key) => {
          map.removeLayer(key)
          map.removeSource(key)
        })
      }

      // set new key array to empty
      let newKeys = []

      route.forEach((poi, idx, arr) => {
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

    return map
  }

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [21.48, 61.76],
      zoom: 5,
      projection: mapSettings.projection,
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    setMap(map)
    map.on('load', () => {
      console.log('map loaded')
      console.log('projection:', map.projection)
      addLayers(map, route, true)
    })

    // Clean up on unmount
    return () => {
      setKeys([])
      map.remove()
    }
  }, [mapSettings])

  // add marker to every item in route
  useEffect(() => {
    addLayers(map, route, false)
    return () => {
      setKeys([])
    }
  }, [route])

  return (
    <>
      <div className='map-container my-2' ref={mapContainerRef}></div>
    </>
  )
}

export default RouteMap
