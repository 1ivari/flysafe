'use client'
import { useFlightStore } from '@/stores/flightStore'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FuelPanel } from '@/components/fuel/FuelPanel'
import { formatTime } from '@/lib/aviation/ofp'

export function Summary() {
  const { basicData, route, ofpRows, aircraft, setStep } = useFlightStore()
  const totalDist = ofpRows.length > 0 ? ofpRows[ofpRows.length - 1].distAcc : 0
  const totalTime = ofpRows.length > 0 ? ofpRows[ofpRows.length - 1].timeAccRaw : 0

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Flight Summary</h2>

      <Card className="space-y-2">
        <h3 className="font-bold">Flight Details</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-[var(--muted-foreground)]">Date:</span> {basicData.date}</div>
          <div><span className="text-[var(--muted-foreground)]">Aircraft:</span> {aircraft.type} {aircraft.registration}</div>
          <div><span className="text-[var(--muted-foreground)]">Departure:</span> {basicData.departure || route[0]?.ident || '-'}</div>
          <div><span className="text-[var(--muted-foreground)]">Destination:</span> {basicData.destination || route[route.length - 1]?.ident || '-'}</div>
          <div><span className="text-[var(--muted-foreground)]">Alternate:</span> {basicData.alternate || '-'}</div>
          <div><span className="text-[var(--muted-foreground)]">Waypoints:</span> {route.length}</div>
          <div><span className="text-[var(--muted-foreground)]">Total Distance:</span> {totalDist.toFixed(1)} NM</div>
          <div><span className="text-[var(--muted-foreground)]">Total Time:</span> {formatTime(totalTime)}</div>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold mb-2">Route</h3>
        <p className="text-sm font-mono">{route.map(w => w.ident).join(' → ') || 'No route'}</p>
      </Card>

      <FuelPanel />

      <Button variant="secondary" onClick={() => setStep('wnb')} className="w-full">← Back to W&B</Button>
    </div>
  )
}
