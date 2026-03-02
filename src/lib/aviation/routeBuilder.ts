import type { Waypoint, OFPRow } from '@/types'
import { calculateOFP } from './ofp'
import turfDistance from '@turf/distance'
import turfBearing from '@turf/bearing'
import turfMidpoint from '@turf/midpoint'

// Simple magnetic declination for Finland (~10-14°E)
// For production: use geomag library. This is a reasonable approximation.
function getMagDeclination(lat: number, lng: number): number {
  // Approximate for Finland region (2024-2026): ~10-13° East
  return 10 + (lat - 60) * 0.3 + (lng - 24) * 0.1
}

export function buildOFPFromRoute(
  route: Waypoint[],
  fuelConsumption: number,
  rampFuel: number,
  taxiFuel: number,
  defaultTas: number = 120
): OFPRow[] {
  if (route.length === 0) return []

  let sumDist = 0
  let sumTime = 0
  let sumFuelBurn = 0

  return route.map((wp, i, arr): OFPRow => {
    const prevCoord = i > 0 ? arr[i - 1].coordinates : wp.coordinates
    const curCoord = wp.coordinates

    const dist = i > 0
      ? turfDistance(
          { type: 'Point', coordinates: prevCoord },
          { type: 'Point', coordinates: curCoord },
          { units: 'nauticalmiles' }
        )
      : 0

    const bear = i > 0
      ? turfBearing(
          { type: 'Point', coordinates: prevCoord },
          { type: 'Point', coordinates: curCoord }
        )
      : 0

    const trueCourse = bear < 0.5 ? bear + 360 : bear >= 360 ? bear - 360 : bear

    const mid = i > 0
      ? turfMidpoint(
          { type: 'Point', coordinates: prevCoord },
          { type: 'Point', coordinates: curCoord }
        ).geometry.coordinates as [number, number]
      : wp.coordinates

    const decl = getMagDeclination(
      i > 0 ? prevCoord[1] : curCoord[1],
      i > 0 ? prevCoord[0] : curCoord[0]
    )

    const desc = i === 0
      ? `DEP: ${wp.ident}`
      : `${arr[i - 1].ident} → ${wp.ident}`

    const result = calculateOFP(trueCourse, defaultTas, 0, 0, dist, decl)
    sumDist += dist
    sumTime += result.timeMinutes
    sumFuelBurn += (fuelConsumption / 60) * result.timeMinutes

    return {
      key: wp.key,
      startCoord: prevCoord as [number, number],
      midCoord: mid,
      endCoord: curCoord as [number, number],
      description: desc,
      minAlt: '',
      planAlt: i === 0 ? '' : '3000',
      tas: i === 0 ? 0 : defaultTas,
      windDir: 0,
      windSpeed: 0,
      trueCourse: i === 0 ? 0 : trueCourse,
      wca: result.windCorrectionAngle,
      trueHeading: result.trueHeading,
      declination: decl,
      magHeading: result.magHeading,
      deviation: 0,
      compassHeading: result.magHeading,
      distLeg: dist,
      distAcc: sumDist,
      gs: result.groundSpeed,
      timeLeg: result.timeMinutes,
      timeLegRaw: result.timeMinutes,
      timeAdd: 0,
      timeAcc: sumTime,
      timeAccRaw: sumTime,
      eto: '',
      ato: '',
      fuelRem: rampFuel - taxiFuel - sumFuelBurn,
      remark: '',
    }
  })
}
