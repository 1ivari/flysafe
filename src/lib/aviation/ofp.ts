import { windCorrection } from './wind'

export interface OFPCalcResult {
  windCorrectionAngle: number
  groundSpeed: number
  timeMinutes: number
  trueHeading: number
  magHeading: number
}

export function calculateOFP(
  trueCourse: number,
  tas: number,
  windDirection: number,
  windSpeed: number,
  distance: number,
  declination: number
): OFPCalcResult {
  const { windCorrectionAngle, groundSpeed } = windCorrection(trueCourse, tas, windDirection, windSpeed)

  const timeMinutes = groundSpeed > 0 ? (distance / groundSpeed) * 60 : 0

  let trueHeading = trueCourse + windCorrectionAngle
  if (trueHeading < 0.5) trueHeading += 360
  if (trueHeading >= 360) trueHeading -= 360

  let magHeading = trueHeading - declination
  if (magHeading < 0.5) magHeading += 360
  if (magHeading >= 360) magHeading -= 360

  return { windCorrectionAngle, groundSpeed, timeMinutes, trueHeading, magHeading }
}

export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}
