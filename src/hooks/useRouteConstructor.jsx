import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext'

export default function useRouteConstructor(data, metar, loading, metLoading) {
  const { route, setRoute } = useContext(AppContext)

  useEffect(() => {
    if (!loading && !metLoading) {
      setRoute([
        ...route,
        {
          key: crypto.randomUUID(),
          geoJSON: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [data.longitude_deg, data.latitude_deg],
            },
            properties: { ...data, metars: metar },
          },
        },
      ])
    }
  }, [loading, metLoading])

  return { route }
}
