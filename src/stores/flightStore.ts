import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Waypoint, OFPRow, BasicData, AircraftProfile, FlightStep, FuelPlan } from '@/types'
import { calculateOFP, formatTime } from '@/lib/aviation/ofp'
import { calculateFuel } from '@/lib/aviation/fuel'

// Default DA40 profile
export const DA40_PROFILE: AircraftProfile = {
  id: 'da40-default',
  type: 'DA40',
  registration: 'OH-XXX',
  basicWeight: 1676,
  arms: { bw: 93.7, frontSeats: 93.5, rearSeats: 115.5, baggage1: 126.9, baggage2: 142.0, fuel: 100.5 },
  fuelCapacity: 40, // US gal
  fuelBurn: 9.5, // gal/hr
  cruiseTas: 120,
  maxTakeoffWeight: 2535,
  envelope: [
    { weight: 1676, arm: 89.0 }, { weight: 1676, arm: 96.8 },
    { weight: 2535, arm: 91.3 }, { weight: 2535, arm: 99.6 },
    { weight: 1676, arm: 89.0 },
  ],
}

interface FlightState {
  step: FlightStep
  setStep: (s: FlightStep) => void
  basicData: BasicData
  setBasicData: (d: Partial<BasicData>) => void
  route: Waypoint[]
  addWaypoint: (wp: Waypoint) => void
  removeWaypoint: (key: string) => void
  reorderWaypoints: (from: number, to: number) => void
  clearRoute: () => void
  ofpRows: OFPRow[]
  setOFPRows: (rows: OFPRow[]) => void
  updateOFPRow: (key: string, field: string, value: number | string) => void
  recalculateOFP: () => void
  aircraft: AircraftProfile
  setAircraft: (a: AircraftProfile) => void
  fuelPlan: FuelPlan | null
  recalculateFuel: () => void
}

export const useFlightStore = create<FlightState>()(
  persist(
    (set, get) => ({
      step: 'basic',
      setStep: (s) => set({ step: s }),

      basicData: {
        date: new Date().toISOString().slice(0, 10),
        departure: '',
        destination: '',
        alternate: '',
        rampFuel: 30,
        taxiFuel: 1,
        fuelConsumption: 9.5,
        aircraftId: 'da40-default',
      },
      setBasicData: (d) => set((s) => ({ basicData: { ...s.basicData, ...d } })),

      route: [],
      addWaypoint: (wp) => set((s) => ({ route: [...s.route, wp] })),
      removeWaypoint: (key) => set((s) => ({ route: s.route.filter((w) => w.key !== key) })),
      reorderWaypoints: (from, to) =>
        set((s) => {
          const r = [...s.route]
          const [item] = r.splice(from, 1)
          r.splice(to, 0, item)
          return { route: r }
        }),
      clearRoute: () => set({ route: [], ofpRows: [] }),

      ofpRows: [],
      setOFPRows: (rows) => set({ ofpRows: rows }),
      updateOFPRow: (key, field, value) =>
        set((s) => ({
          ofpRows: s.ofpRows.map((r) => (r.key === key ? { ...r, [field]: value } : r)),
        })),
      recalculateOFP: () => {
        const { ofpRows, basicData } = get()
        let sumTime = 0
        let sumDist = 0
        const updated = ofpRows.map((row, i) => {
          if (i === 0) {
            return { ...row, distLeg: 0, distAcc: 0, timeLeg: 0, timeLegRaw: 0, timeAcc: 0, timeAccRaw: 0 }
          }
          const result = calculateOFP(row.trueCourse, row.tas, row.windDir, row.windSpeed, row.distLeg, row.declination)
          const timeLegRaw = result.timeMinutes + row.timeAdd
          sumTime += timeLegRaw
          sumDist += row.distLeg
          return {
            ...row,
            wca: result.windCorrectionAngle,
            gs: result.groundSpeed,
            trueHeading: result.trueHeading,
            magHeading: result.magHeading,
            timeLegRaw,
            timeLeg: result.timeMinutes,
            timeAcc: sumTime,
            timeAccRaw: sumTime,
            distAcc: sumDist,
          }
        })
        // Calc fuel remaining
        let sumConsumption = 0
        const withFuel = updated.map((row) => {
          sumConsumption += (basicData.fuelConsumption / 60) * row.timeLegRaw
          return { ...row, fuelRem: basicData.rampFuel - basicData.taxiFuel - sumConsumption }
        })
        set({ ofpRows: withFuel })
      },

      aircraft: DA40_PROFILE,
      setAircraft: (a) => set({ aircraft: a }),

      fuelPlan: null,
      recalculateFuel: () => {
        const { aircraft, ofpRows } = get()
        const totalTime = ofpRows.length > 0 ? ofpRows[ofpRows.length - 1].timeAccRaw : 0
        set({ fuelPlan: calculateFuel(aircraft, totalTime) })
      },
    }),
    { name: 'flysafe-flight-v2' }
  )
)
