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
  Tooltip,
} from 'react-leaflet'
import greatCircle from '@turf/great-circle'
import L from 'leaflet'
import airspaces from '../../data/airspaces.json'

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

  const alwaysActiveFilter = (obj) => {
    return obj.properties.alwaysActive === true
  }
  const classCFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      obj.properties.airspaceclass === 'C'
    )
  }
  const classCOptions = { color: '#FF6F00', fillcolor: '#FFD54F', weight: 1 }

  const classDFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      obj.properties.airspaceclass === 'D'
    )
  }

  const classGFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      obj.properties.airspaceclass === 'G'
    )
  }

  const prohibitedFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      (obj.properties.airspaceclass === 'Prohibited') |
        (obj.properties.airspaceclass === 'Restricted')
    )
  }

  const rmzFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      obj.properties.airspaceclass === 'RMZ'
    )
  }

  const otherFilter = (obj) => {
    return (
      obj.properties.alwaysActive === true &&
      obj.properties.airspaceclass === 'Other'
    )
  }

  function PolygonForAirspace(props) {
    const classCOptions = { color: '#FF6F00', fillcolor: '#FFD54F', weight: 1 }
    const classDOptions = { color: '#827717', fillcolor: '#DCE775', weight: 1 }
    const classGOptions = {
      color: '#006064',
      fillcolor: '#4DD0E1',
      weight: 1,
    }
    const prohibitedOptions = {
      color: '#B71C1C',
      fillcolor: '#EF9A9A',
      weight: 1,
    }
    const rmzOptions = {
      color: '#0D47A1',
      fillcolor: '#90CAF9',
      weight: 1,
    }

    const otherOptions = {
      color: '#263238',
      fillcolor: '#B0BEC5',
      weight: 1,
    }

    const dangerOptions = {
      color: '#F57F17',
      fillcolor: '#FFF176',
      weight: 1,
    }

    const { airspace, showToolTip } = props

    const info = airspace.properties
    const geometry = airspace.geometry

    function AirspaceToolTip(props) {
      const { info } = props
      return (
        <Tooltip sticky className='tooltip tooltip-primary'>
          <h1>
            <strong>{info.name}</strong>
          </h1>
          <ul>
            <li>Airspace class: {info.airspaceclass}</li>
            <li>Upper Limit: {info.upper}</li>
            <li>Lower Limit: {info.lower}</li>
            <li>Frequency: {info.freq}</li>
            <li>Always active: {info.alwaysActive ? 'Yes' : 'No'}</li>
          </ul>
        </Tooltip>
      )
    }

    switch (info.airspaceclass) {
      case 'C':
        return (
          <GeoJSON data={geometry} pathOptions={classCOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'D':
        return (
          <GeoJSON data={geometry} pathOptions={classDOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'G':
        return (
          <GeoJSON data={geometry} pathOptions={classGOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'Prohibited':
        return (
          <GeoJSON data={geometry} pathOptions={prohibitedOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'RMZ':
        return (
          <GeoJSON data={geometry} pathOptions={rmzOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'Other':
        return (
          <GeoJSON data={geometry} pathOptions={otherOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'Danger':
        return (
          <GeoJSON data={geometry} pathOptions={dangerOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      case 'Restricted':
        return (
          <GeoJSON data={geometry} pathOptions={dangerOptions}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break

      default:
        return (
          <GeoJSON data={geometry}>
            {showToolTip && <AirspaceToolTip info={info} />}
          </GeoJSON>
        )
        break
    }
  }

  const testOnClick = () => {
    console.log(
      airspaces.features
        .filter(alwaysActiveFilter)
        .map((item) => item.properties.airspaceclass)
    )
  }

  return (
    <>
      {/* <button className='btn btn-primary' onClick={testOnClick}>
        test
      </button> */}
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
        {airspaces.features
          .filter((obj) => obj.properties.alwaysActive === true)
          .map((airspace) => {
            return <PolygonForAirspace airspace={airspace} showToolTip={true} />
          })}
      </MapContainer>
    </>
  )
}

export default LeafletMap
