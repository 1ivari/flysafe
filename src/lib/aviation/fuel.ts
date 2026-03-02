import type { FuelPlan, AircraftProfile } from '@/types'

export function calculateFuel(
  profile: AircraftProfile,
  tripTimeMinutes: number,
  alternateTimeMinutes: number = 0
): FuelPlan {
  const burnPerMin = profile.fuelBurn / 60
  const taxiFuel = 1.0 // gal standard
  const climbFuel = burnPerMin * 1.2 * 10 // 10 min climb, 20% extra
  const descentFuel = burnPerMin * 0.5 * 5 // 5 min descent, 50% burn
  const cruiseTime = Math.max(0, tripTimeMinutes - 15) // subtract climb+descent time
  const cruiseFuel = burnPerMin * cruiseTime
  const tripFuel = climbFuel + cruiseFuel + descentFuel
  const reserveFuel = burnPerMin * 45 // 45 min VFR reserve
  const alternateFuel = burnPerMin * alternateTimeMinutes
  const totalRequired = taxiFuel + tripFuel + reserveFuel + alternateFuel
  const rampFuel = Math.ceil(totalRequired * 10) / 10
  const endurance = rampFuel > taxiFuel ? ((rampFuel - taxiFuel) / burnPerMin) : 0

  return { taxiFuel, climbFuel, cruiseFuel, descentFuel, tripFuel, reserveFuel, alternateFuel, totalRequired, rampFuel, endurance }
}
