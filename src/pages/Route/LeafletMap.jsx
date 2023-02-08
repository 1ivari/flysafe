import React, { useRef, useEffect, useState, useContext } from 'react'
import AppContext from '../../context/AppContext'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  Polyline,
} from 'react-leaflet'
import greatCircle from '@turf/great-circle'

function LeafletMap() {
  const { route } = useContext(AppContext)
  return (
    <MapContainer
      style={{ height: '100%', width: '100%' }}
      center={[61.76, 21.48]}
      zoom={6}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
                        <li>METAR: {props.metars[props.metars.length - 1]}</li>
                        {props.runways.map((runway) => {
                          return (
                            <li key={runway.ident}>
                              Runway: {runway.he_ident} - {runway.le_ident}
                            </li>
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
      {/* <GeoJSON data={route[0].geoJSON} /> */}
    </MapContainer>
  )
}

export default LeafletMap
