import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'

const Map = ({ center, zoom }) => {
  return (
    <div className='map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDOA230KS-M4YSlU54aCebUA11WZQyzGZg' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
        {/* <Marker position={{ lat: 61.461700439453, lng: 21.799999237061 }} /> */}
      </GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 61.461700439453,
    lng: 21.799999237061,
  },
  zoom: 8,
}

export default Map
