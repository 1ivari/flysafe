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

function LeafletMap() {
  const { route, setRoute } = useContext(AppContext)
  console.log(
    'rendering route map for: ',
    route.map((item) => item.geoJSON.properties.ident)
  )

  function AddMarker() {
    const [pos, setPos] = useState(null)
    const map = useMapEvents({
      click: (e) => {
        setPos(e.latlng)
        console.log('click:', pos)
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
        console.log(route)
      },
    })
    return pos ? <Marker position={pos} /> : null
  }
  return (
    <MapContainer
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
            <GeoJSON data={poi.geoJSON}>
              {props.type === 'medium_airport' ||
              props.type === 'large_airport' ? (
                // Popup for airports
                <Popup>
                  {
                    <div>
                      <strong>{props.ident}</strong>
                      <ul>
                        <li key={poi.key}>
                          METAR: {props.metars[props.metars.length - 1]}
                        </li>
                        {props.runways.map((runway) => {
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
              ) : null}
            </GeoJSON>
            {idx > 0 ? (
              <GeoJSON
                data={greatCircle(arr[idx - 1].geoJSON, arr[idx].geoJSON)}
              />
            ) : null}
          </>
        )
      })}
      <AddMarker />
    </MapContainer>
  )
}

export default LeafletMap
