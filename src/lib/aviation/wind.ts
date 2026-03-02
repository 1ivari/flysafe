import { KNOTS_TO_MS, MS_TO_KNOTS } from './constants'

export interface WindResult {
  windCorrectionAngle: number
  groundSpeed: number
  crosswindComponent: number
  headwindComponent: number
}

export function windCorrection(
  course: number,
  trueAirspeed: number,
  windDirection: number,
  windSpeed: number
): WindResult {
  if (trueAirspeed === 0) {
    return { windCorrectionAngle: 0, groundSpeed: 0, crosswindComponent: 0, headwindComponent: 0 }
  }

  let windAngle = course - (180 + windDirection)

  const courseRad = (course * Math.PI) / 180
  const windDirRad = (windDirection * Math.PI) / 180
  const wsMs = windSpeed * KNOTS_TO_MS
  const tasMs = trueAirspeed * KNOTS_TO_MS
  const windAngleRad = (windAngle * Math.PI) / 180

  const wcaRad = -Math.asin((wsMs / tasMs) * Math.sin(windAngleRad))
  const crossMs = wsMs * Math.sin(windAngleRad)
  const headMs = wsMs * Math.cos(windAngleRad)
  const gsMs = tasMs - headMs

  return {
    windCorrectionAngle: (wcaRad * 180) / Math.PI,
    groundSpeed: gsMs * MS_TO_KNOTS,
    crosswindComponent: crossMs * MS_TO_KNOTS,
    headwindComponent: headMs * MS_TO_KNOTS,
  }
}
