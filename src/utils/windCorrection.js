import constants from './constants'

function windCorrection(course, trueAirspeed, windDirection, windSpeed) {
  if (trueAirspeed === 0)
    return {
      windCorrectionAngle: 0,
      groundSpeed: 0,
      crosswindComponent: 0,
      headwindComponent: 0,
    }

  let windAngle = course - (180 + windDirection)

  // unit conversions
  //course from degrees to radians
  course = (course * Math.PI) / 180
  //windDirection from degrees to radians
  windDirection = (windDirection * Math.PI) / 180
  //windSpeed from knots to m/s
  windSpeed = windSpeed * constants.KNOTS_TO_MS
  //trueAirspeed from knots to m/s
  trueAirspeed = trueAirspeed * constants.KNOTS_TO_MS
  //windAngle from degrees to radians
  windAngle = (windAngle * Math.PI) / 180

  let windCorrectionAngle = -Math.asin(
    (windSpeed / trueAirspeed) * Math.sin(windAngle)
  )
  let crosswindComponent = windSpeed * Math.sin(windAngle)
  let headwindComponent = windSpeed * Math.cos(windAngle)
  let groundSpeed = trueAirspeed - headwindComponent

  // let windCorrectionAngle = Math.atan2(
  // 	windSpeed * Math.sin(windDirection - course),
  // 	trueAirspeed
  // )
  // let groundSpeed = Math.sqrt(
  // 	trueAirspeed ** 2 -
  // 		windSpeed ** 2 +
  // 		2 * trueAirspeed * windSpeed * Math.cos(windDirection - course)
  // )
  // let crosswindComponent = windSpeed * Math.sin(windCorrectionAngle)
  // let headwindComponent = windSpeed * Math.cos(windCorrectionAngle)

  // convert results back to original units
  // windCorrectionAngle from radians to degrees
  windCorrectionAngle = (windCorrectionAngle * 180) / Math.PI
  console.log(
    'groundSpeed',
    groundSpeed,
    'windCorrectionAngle',
    windCorrectionAngle
  )
  // groundSpeed from m/s to knots
  groundSpeed = groundSpeed * constants.MS_TO_KNOTS
  // crosswindComponent from m/s to knots
  crosswindComponent = crosswindComponent * constants.MS_TO_KNOTS
  // headwindComponent from m/s to knots
  headwindComponent = headwindComponent * constants.MS_TO_KNOTS

  return {
    windCorrectionAngle,
    groundSpeed,
    crosswindComponent,
    headwindComponent,
  }
}

export default windCorrection
