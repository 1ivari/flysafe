import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import windCorrection from './windCorrection'

dayjs.extend(duration)

function calculateOFP(
  trueCourse,
  tas,
  windDirection,
  windSpeed,
  distanceInterval,
  declination
) {
  const { windCorrectionAngle, groundSpeed } = windCorrection(
    trueCourse,
    tas,
    windDirection,
    windSpeed
  )
  const timeIntervalRaw =
    (Math.ceil(distanceInterval) / Math.floor(groundSpeed)) * 60 // timeinterval in minutes
  const timeIntervalDayjs = dayjs.duration(timeIntervalRaw, 'minutes')
  // sumNum += int
  // const timeAccumulation = dayjs.duration(sumNum, 'hours')

  let trueHeading = 0
  if (trueCourse + windCorrectionAngle < 0.5) {
    trueHeading = trueCourse + windCorrectionAngle + 360
  } else {
    trueHeading = trueCourse + windCorrectionAngle
  }

  let magHeading = 0
  if (trueHeading - declination < 0.5) {
    magHeading = trueHeading - declination + 360
  } else {
    magHeading = trueHeading - declination
  }

  return {
    windCorrectionAngle,
    groundSpeed,
    timeIntervalRaw,
    timeIntervalDayjs,
    trueHeading,
    magHeading,
  }
}

export default calculateOFP
