import React, { useRef, useEffect, useState, useContext } from 'react'
import AppContext from '../../context/AppContext'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import greatCircle from '@turf/great-circle'
import L from 'leaflet'

function LeafletMap() {
  const { route, setRoute } = useContext(AppContext)
  const mapRef = useRef()

  function MarkerForAirports(props) {
    const poi = props.poi
    const properties = poi.geoJSON.properties
    return (
      <>
        <GeoJSON key={poi.key} data={poi.geoJSON}>
          <Popup>
            {
              <div>
                <strong>{properties.ident}</strong>
                <ul>
                  <li key={poi.key}>
                    METAR: {properties.metars[properties.metars.length - 1]}
                  </li>
                  {properties.runways.map((runway) => {
                    return (
                      <>
                        <li key={crypto.randomUUID()}>
                          Runway: {runway.he_ident} - {runway.le_ident}
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            }
          </Popup>
        </GeoJSON>
      </>
    )
  }

  function MarkerForSmallAirports(props) {
    const poi = props.poi
    const properties = poi.geoJSON.properties
    var greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
    return (
      <>
        <GeoJSON
          key={poi.key}
          data={poi.geoJSON}
          pointToLayer={function (feature, latlng) {
            return L.marker(latlng, {
              icon: greenIcon,
            })
          }}
        >
          <Popup>
            {
              <div>
                <strong>{properties.ident}</strong>
                <ul>
                  {properties.runways.map((runway) => {
                    return (
                      <>
                        <li key={crypto.randomUUID()}>
                          Runway: {runway.he_ident} - {runway.le_ident}
                        </li>
                      </>
                    )
                  })}
                </ul>
              </div>
            }
          </Popup>
        </GeoJSON>
      </>
    )
  }

  function MarkerForCustom(props) {
    const poi = props.poi
    const idx = props.idx
    var violetIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
    return (
      <>
        <GeoJSON
          key={poi.key}
          data={poi.geoJSON}
          pointToLayer={function (feature, latlng) {
            return L.marker(latlng, {
              icon: violetIcon,
            })
          }}
        >
          <Popup>
            {
              <form action=''>
                <label htmlFor='ident'>Ident</label>

                <input
                  className='input bg-primary-content'
                  defaultValue={props.ident}
                  onChange={(e) => {
                    const newRoute = [...route]
                    newRoute[idx].geoJSON.properties.ident = e.target.value
                    setRoute(newRoute)
                    console.log(poi.key)
                  }}
                  type='text'
                ></input>
              </form>
            }
          </Popup>
        </GeoJSON>
      </>
    )
  }

  function AddCustomMarkerOnClick() {
    function ptoLayer() {}
    const [pos, setPos] = useState(null)
    const map = useMapEvents({
      click: (e) => {
        setPos(e.latlng)
        setRoute([
          ...route,
          {
            key: crypto.randomUUID(),
            geoJSON: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat],
              },
              properties: {
                ident: 'Custom',
                type: 'custom',
                metars: [],
              },
            },
          },
        ])
      },
    })

    return pos ? <Marker position={pos} /> : null
  }

  return (
    <MapContainer
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
      center={[61.76, 21.48]}
      zoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors. NOT FOR OPERATIONAL USE'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {route.map((poi, idx, arr) => {
        const props = poi.geoJSON.properties
        return (
          <>
            {props.type === 'medium_airport' ||
            props.type === 'large_airport' ? (
              <MarkerForAirports poi={poi} />
            ) : props.type === 'custom' ? (
              <MarkerForCustom poi={poi} idx={idx} />
            ) : props.type === 'small_airport' ? (
              <MarkerForSmallAirports poi={poi} />
            ) : null}
            {idx > 0 ? (
              <GeoJSON
                key={crypto.randomUUID()}
                data={greatCircle(arr[idx - 1].geoJSON, arr[idx].geoJSON)}
              />
            ) : null}
          </>
        )
      })}
      <AddCustomMarkerOnClick />
    </MapContainer>
  )
}

export default LeafletMap
