import { useContext } from 'react'
import Map, { Marker } from 'react-map-gl'
import AppContext from '../context/AppContext.jsx'

import pin from '../assets/pin.png'

const MapBox = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

  const { route, setRoute } = useContext(AppContext)

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
      }}
    >
      {route.map((wpt, idx) => {
        return (
          <Marker
            key={idx}
            longitude={wpt.longitude_deg}
            latitude={wpt.latitude_deg}
            anchor='bottom'
          >
            <img src='../assets/pin.png' />
          </Marker>
          // console.log(wpt.longitude_deg)
        )
      })}
    </Map>
  )
}

export default MapBox
