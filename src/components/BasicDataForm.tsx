'use client'
import { useFlightStore } from '@/stores/flightStore'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export function BasicDataForm() {
  const { basicData, setBasicData, setStep } = useFlightStore()

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-bold">Basic Flight Data</h2>
      <Card className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <Input type="date" value={basicData.date} onChange={e => setBasicData({ date: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Departure (ICAO)</label>
            <Input value={basicData.departure} onChange={e => setBasicData({ departure: e.target.value.toUpperCase() })} placeholder="EFHK" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Destination (ICAO)</label>
            <Input value={basicData.destination} onChange={e => setBasicData({ destination: e.target.value.toUpperCase() })} placeholder="EFTU" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Alternate (ICAO)</label>
          <Input value={basicData.alternate} onChange={e => setBasicData({ alternate: e.target.value.toUpperCase() })} placeholder="EFHF" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Ramp Fuel (gal)</label>
            <Input type="number" value={basicData.rampFuel} onChange={e => setBasicData({ rampFuel: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Taxi Fuel (gal)</label>
            <Input type="number" value={basicData.taxiFuel} onChange={e => setBasicData({ taxiFuel: Number(e.target.value) })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fuel Burn (gal/hr)</label>
            <Input type="number" value={basicData.fuelConsumption} onChange={e => setBasicData({ fuelConsumption: Number(e.target.value) })} />
          </div>
        </div>
      </Card>
      <Button onClick={() => setStep('route')} className="w-full">Continue to Route →</Button>
    </div>
  )
}
