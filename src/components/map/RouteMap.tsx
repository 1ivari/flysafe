'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useFlightStore } from '@/stores/flightStore'
import { AirportSearch } from './AirportSearch'
import type { Airport, Waypoint, AirspaceFeature } from '@/types'
import { Button } from '@/components/ui/Button'

export function RouteMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<maplibregl.Marker[]>([])
  const { route, addWaypoint, removeWaypoint, clearRoute, setStep } = useFlightStore()
  const [airports, setAirports] = useState<Airport[]>([])
  const [airspaces, setAirspaces] = useState<AirspaceFeature[]>([])
  const [vfrRep, setVfrRep] = useState<any>(null)

  // Load data
  useEffect(() => {
    Promise.all([
      fetch('/api/data/airports').then(r => r.json()),
      fetch('/api/data/airspaces').then(r => r.json()),
      fetch('/api/data/vfrrep').then(r => r.json()),
    ]).then(([ap, as, vfr]) => {
      setAirports(ap)
      setAirspaces(as)
      setVfrRep(vfr)
    })
  }, [])

  // Init map
  useEffect(() => {
    if (!mapContainer.current || map.current) return
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [25.0, 62.0], // Finland center
      zoom: 5.5,
    })
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Click to add custom waypoint
    map.current.on('click', (e) => {
      // Only if not clicking a marker
      const features = map.current!.queryRenderedFeatures(e.point)
      if (features.some(f => f.layer.id.startsWith('airport') || f.layer.id.startsWith('vfr'))) return

      const wp: Waypoint = {
        key: crypto.randomUUID(),
        type: 'custom',
        ident: `WP${Date.now().toString(36).slice(-4).toUpperCase()}`,
        name: `${e.lngLat.lat.toFixed(4)}N ${e.lngLat.lng.toFixed(4)}E`,
        coordinates: [e.lngLat.lng, e.lngLat.lat],
      }
      addWaypoint(wp)
    })

    return () => { map.current?.remove(); map.current = null }
  }, [])

  // Add airspace layers
  useEffect(() => {
    const m = map.current
    if (!m || airspaces.length === 0) return
    const onLoad = () => {
      if (m.getSource('airspaces')) return
      m.addSource('airspaces', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: airspaces as any },
      })
      m.addLayer({
        id: 'airspaces-fill',
        type: 'fill',
        source: 'airspaces',
        paint: { 'fill-color': '#3b82f6', 'fill-opacity': 0.08 },
      })
      m.addLayer({
        id: 'airspaces-line',
        type: 'line',
        source: 'airspaces',
        paint: { 'line-color': '#3b82f6', 'line-opacity': 0.4, 'line-width': 1 },
      })
    }
    if (m.isStyleLoaded()) onLoad()
    else m.on('load', onLoad)
  }, [airspaces])

  // Add VFR reporting points
  useEffect(() => {
    const m = map.current
    if (!m || !vfrRep) return
    const onLoad = () => {
      if (m.getSource('vfr-rep')) return
      m.addSource('vfr-rep', { type: 'geojson', data: vfrRep })
      m.addLayer({
        id: 'vfr-rep-circles',
        type: 'circle',
        source: 'vfr-rep',
        paint: { 'circle-radius': 5, 'circle-color': '#f59e0b', 'circle-stroke-color': '#fff', 'circle-stroke-width': 1 },
      })
      m.addLayer({
        id: 'vfr-rep-labels',
        type: 'symbol',
        source: 'vfr-rep',
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 10,
          'text-offset': [0, 1.5],
          'text-anchor': 'top',
        },
        paint: { 'text-color': '#f59e0b', 'text-halo-color': '#000', 'text-halo-width': 1 },
      })

      // Click VFR rep to add as waypoint
      m.on('click', 'vfr-rep-circles', (e) => {
        if (!e.features?.[0]) return
        const props = e.features[0].properties!
        const coords = (e.features[0].geometry as any).coordinates
        const wp: Waypoint = {
          key: crypto.randomUUID(),
          type: 'vfr-rep',
          ident: props.name,
          name: `${props.name} (${props.desc})`,
          coordinates: coords,
        }
        addWaypoint(wp)
        e.originalEvent.stopPropagation()
      })
    }
    if (m.isStyleLoaded()) onLoad()
    else m.on('load', onLoad)
  }, [vfrRep])

  // Update route markers and line
  useEffect(() => {
    const m = map.current
    if (!m) return

    // Clear old markers
    markersRef.current.forEach(mk => mk.remove())
    markersRef.current = []

    // Add markers
    route.forEach((wp, i) => {
      const color = wp.type === 'airport' ? '#22c55e' : wp.type === 'vfr-rep' ? '#f59e0b' : '#8b5cf6'
      const marker = new maplibregl.Marker({ color })
        .setLngLat(wp.coordinates)
        .setPopup(new maplibregl.Popup().setHTML(`
          <div style="color:#000">
            <strong>${wp.ident}</strong><br/>
            <small>${wp.name}</small><br/>
            <em>${wp.type}</em>
          </div>
        `))
        .addTo(m)
      markersRef.current.push(marker)
    })

    // Route line
    const updateLine = () => {
      const coords = route.map(w => w.coordinates)
      const geojson: any = {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: coords },
        properties: {},
      }
      if (m.getSource('route-line')) {
        (m.getSource('route-line') as any).setData(coords.length >= 2 ? geojson : { type: 'FeatureCollection', features: [] })
      } else if (m.isStyleLoaded()) {
        m.addSource('route-line', { type: 'geojson', data: coords.length >= 2 ? geojson : { type: 'FeatureCollection', features: [] } })
        m.addLayer({
          id: 'route-line-layer',
          type: 'line',
          source: 'route-line',
          paint: { 'line-color': '#f472b6', 'line-width': 3, 'line-dasharray': [2, 2] },
        })
      }
    }
    if (m.isStyleLoaded()) updateLine()
    else m.on('load', updateLine)
  }, [route])

  const handleSelectAirport = useCallback((airport: Airport) => {
    const wp: Waypoint = {
      key: crypto.randomUUID(),
      type: 'airport',
      ident: airport.ident,
      name: `${airport.name} (${airport.municipality || ''})`,
      coordinates: [airport.longitude_deg, airport.latitude_deg],
      airport,
    }
    addWaypoint(wp)
    map.current?.flyTo({ center: wp.coordinates, zoom: 10 })
  }, [addWaypoint])

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex gap-2 items-center flex-wrap bg-[var(--card)] border-b border-[var(--border)]">
        <AirportSearch airports={airports} onSelect={handleSelectAirport} />
        <Button variant="destructive" size="sm" onClick={clearRoute}>Clear</Button>
        <Button variant="secondary" size="sm" onClick={() => setStep('weather')}>Weather →</Button>
      </div>

      {/* Route list */}
      {route.length > 0 && (
        <div className="p-2 flex gap-1 overflow-x-auto bg-[var(--card)] border-b border-[var(--border)]">
          {route.map((wp, i) => (
            <div key={wp.key} className="flex items-center gap-1 bg-[var(--secondary)] rounded px-2 py-1 text-xs shrink-0">
              {i > 0 && <span className="text-[var(--muted-foreground)]">→</span>}
              <span className="font-mono font-bold">{wp.ident}</span>
              <button onClick={() => removeWaypoint(wp.key)} className="text-[var(--destructive)] hover:opacity-70 ml-1">×</button>
            </div>
          ))}
        </div>
      )}

      <div ref={mapContainer} className="flex-1 min-h-[400px]" />
    </div>
  )
}
