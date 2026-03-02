'use client'
import { useState, useEffect } from 'react'
import { useFlightStore, DA40_PROFILE } from '@/stores/flightStore'
import { calculateWnB, type WnBResult } from '@/lib/aviation/wnb'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function WnBPanel() {
  const { aircraft, setStep } = useFlightStore()
  const [input, setInput] = useState({
    basicWeight: aircraft.basicWeight,
    basicArm: aircraft.arms.bw,
    frontSeats: 170,
    rearSeats: 0,
    baggage1: 10,
    baggage2: 0,
    fuelGal: 30,
  })
  const [result, setResult] = useState<WnBResult | null>(null)

  useEffect(() => {
    const r = calculateWnB(aircraft, input)
    setResult(r)
  }, [input, aircraft])

  const setField = (key: string, value: number) => setInput(p => ({ ...p, [key]: value }))

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Weight & Balance — {aircraft.type} {aircraft.registration}</h2>

      <Card className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Front Seats (lbs)</label>
            <Input type="number" value={input.frontSeats} onChange={e => setField('frontSeats', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rear Seats (lbs)</label>
            <Input type="number" value={input.rearSeats} onChange={e => setField('rearSeats', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Baggage 1 (lbs)</label>
            <Input type="number" value={input.baggage1} onChange={e => setField('baggage1', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Baggage 2 (lbs)</label>
            <Input type="number" value={input.baggage2} onChange={e => setField('baggage2', Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuel (US gal)</label>
            <Input type="number" value={input.fuelGal} onChange={e => setField('fuelGal', Number(e.target.value))} />
          </div>
        </div>
      </Card>

      {result && (
        <Card>
          <h3 className="font-bold mb-2">Results</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-1">Item</th>
                <th className="text-right py-1">Weight (lbs)</th>
                <th className="text-right py-1">Arm (in)</th>
                <th className="text-right py-1">Moment</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map(item => (
                <tr key={item.label} className="border-b border-[var(--border)]">
                  <td className="py-1">{item.label}</td>
                  <td className="text-right">{item.weight.toFixed(1)}</td>
                  <td className="text-right">{item.arm.toFixed(1)}</td>
                  <td className="text-right">{item.moment.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="text-sm"><strong>Total Weight:</strong> {result.totalWeight.toFixed(1)} lbs</p>
              <p className="text-sm"><strong>CG:</strong> {result.cg.toFixed(2)} in</p>
              <p className="text-sm"><strong>Max TOW:</strong> {aircraft.maxTakeoffWeight} lbs</p>
            </div>
            <div className={`text-lg font-bold px-3 py-1 rounded ${result.withinEnvelope ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {result.withinEnvelope ? '✓ IN ENVELOPE' : '⚠ OUT OF LIMITS'}
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setStep('ofp')}>← OFP</Button>
        <Button onClick={() => setStep('summary')}>Summary →</Button>
      </div>
    </div>
  )
}
