import Map from 'react-map-gl'

const MapBox = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

  return (
    <Map
      initialViewState={{
        longitude: 21.799999237061,
        latitude: 61.461700439453,
        zoom: 14,
      }}
      mapStyle='mapbox://styles/mapbox/dark-v9'
      mapboxAccessToken={MAPBOX_TOKEN}
      id='map-container'
    />
  )
}

export default MapBox
