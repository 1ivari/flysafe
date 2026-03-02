import type { AircraftProfile, WnBInput } from '@/types'
import { LBS_PER_GAL_AVGAS } from './constants'

export interface WnBResult {
  totalWeight: number
  cg: number
  withinEnvelope: boolean
  items: { label: string; weight: number; arm: number; moment: number }[]
}

export function calculateWnB(profile: AircraftProfile, input: WnBInput): WnBResult {
  const fuelWeight = input.fuelGal * LBS_PER_GAL_AVGAS
  const items = [
    { label: 'Basic Empty Weight', weight: input.basicWeight, arm: profile.arms.bw, moment: input.basicWeight * profile.arms.bw },
    { label: 'Front Seats', weight: input.frontSeats, arm: profile.arms.frontSeats, moment: input.frontSeats * profile.arms.frontSeats },
    { label: 'Rear Seats', weight: input.rearSeats, arm: profile.arms.rearSeats, moment: input.rearSeats * profile.arms.rearSeats },
    { label: 'Baggage 1', weight: input.baggage1, arm: profile.arms.baggage1, moment: input.baggage1 * profile.arms.baggage1 },
    { label: 'Baggage 2', weight: input.baggage2, arm: profile.arms.baggage2, moment: input.baggage2 * profile.arms.baggage2 },
    { label: 'Fuel', weight: fuelWeight, arm: profile.arms.fuel, moment: fuelWeight * profile.arms.fuel },
  ]

  const totalWeight = items.reduce((s, i) => s + i.weight, 0)
  const totalMoment = items.reduce((s, i) => s + i.moment, 0)
  const cg = totalWeight > 0 ? totalMoment / totalWeight : 0

  // Check envelope
  let withinEnvelope = totalWeight <= profile.maxTakeoffWeight
  if (profile.envelope.length >= 2) {
    // Simple polygon point-in-envelope check
    const env = profile.envelope
    let inside = false
    for (let i = 0, j = env.length - 1; i < env.length; j = i++) {
      const xi = env[i].arm, yi = env[i].weight
      const xj = env[j].arm, yj = env[j].weight
      if ((yi > totalWeight) !== (yj > totalWeight) &&
        cg < ((xj - xi) * (totalWeight - yi)) / (yj - yi) + xi) {
        inside = !inside
      }
    }
    withinEnvelope = inside
  }

  return { totalWeight, cg, withinEnvelope, items }
}
