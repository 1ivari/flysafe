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
  const timeIntervalRaw = Math.ceil(distanceInterval) / Math.floor(groundSpeed)
  const timeIntervalDayjs = dayjs.duration(timeIntervalRaw, 'hours')
  // sumNum += int
  // const timeAccumulation = dayjs.duration(sumNum, 'hours')

  const trueHeading = trueCourse + windCorrectionAngle
  const magHeading = trueHeading - declination

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
