const calcTime = (spd, spdUnit, dist, distUnit, outFormat) => {
  if (Number(spd) === 0 || Number(dist) === 0) {
    return 0
  }

  let spd_ms = Number(0)
  let time_s = Number(0)
  let dist_m = Number(0)

  switch (spdUnit) {
    case 'kt':
      spd_ms = 0.5144444 * spd
      console.log(`spd m/s: ${spd_ms}`)
      break
    default:
      spd_ms = spd
  }

  switch (distUnit) {
    case 'nm':
      dist_m = 1852 * dist
      console.log(`dist_m: ${dist_m}`)
      break
    default:
      dist_m = dist
  }

  time_s = dist_m / spd_ms
  console.log(`time_s:${time_s}`)

  switch (outFormat) {
    case 'min':
      return Math.round(time_s / 60)
      break

    default:
      return Math.round(time_s)
  }
}

export default calcTime
