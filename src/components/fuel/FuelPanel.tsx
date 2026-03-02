'use client'
import { useEffect } from 'react'
import { useFlightStore } from '@/stores/flightStore'
import { Card } from '@/components/ui/Card'
import { formatTime } from '@/lib/aviation/ofp'

export function FuelPanel() {
  const { fuelPlan, recalculateFuel, aircraft } = useFlightStore()

  useEffect(() => { recalculateFuel() }, [])

  if (!fuelPlan) return <Card><p className="text-[var(--muted-foreground)]">No fuel plan calculated yet.</p></Card>

  const rows = [
    ['Taxi Fuel', fuelPlan.taxiFuel],
    ['Climb Fuel', fuelPlan.climbFuel],
    ['Cruise Fuel', fuelPlan.cruiseFuel],
    ['Descent Fuel', fuelPlan.descentFuel],
    ['Trip Fuel', fuelPlan.tripFuel],
    ['Reserve (45 min)', fuelPlan.reserveFuel],
    ['Alternate Fuel', fuelPlan.alternateFuel],
    ['Total Required', fuelPlan.totalRequired],
    ['Ramp Fuel', fuelPlan.rampFuel],
  ] as const

  return (
    <Card className="space-y-2">
      <h3 className="font-bold">Fuel Plan — {aircraft.type}</h3>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, val]) => (
            <tr key={label} className="border-b border-[var(--border)]">
              <td className="py-1">{label}</td>
              <td className="text-right font-mono">{val.toFixed(1)} gal</td>
            </tr>
          ))}
          <tr>
            <td className="py-1 font-bold">Endurance</td>
            <td className="text-right font-mono font-bold">{formatTime(fuelPlan.endurance)}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
