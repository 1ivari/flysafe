import Map from 'react-map-gl'

const MapBox = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

  return (
    <Map
      initialViewState={{
        longitude: 21.799999237061,
        latitude: 61.461700439453,
        zoom: 6,
      }}
      mapStyle='mapbox://styles/mapbox/outdoors-v11'
      mapboxAccessToken={MAPBOX_TOKEN}
      id='map-container'
      projection={{
        name: 'lambertConformalConic',
        center: [-40, 0],
        parallels: [90, 90],
      }
    }
    />

    
  )
}

export default MapBox
