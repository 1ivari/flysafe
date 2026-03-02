'use client'
import { useEffect } from 'react'
import { useFlightStore } from '@/stores/flightStore'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatTime } from '@/lib/aviation/ofp'
import { buildOFPFromRoute } from '@/lib/aviation/routeBuilder'

export function OFPTable() {
  const { route, ofpRows, setOFPRows, updateOFPRow, recalculateOFP, basicData, setStep } = useFlightStore()

  // Build OFP rows from route when entering step
  useEffect(() => {
    if (route.length >= 2 && ofpRows.length === 0) {
      const rows = buildOFPFromRoute(route, basicData.fuelConsumption, basicData.rampFuel, basicData.taxiFuel)
      setOFPRows(rows)
    }
  }, [route])

  const handleChange = (key: string, field: string, value: string) => {
    const numFields = ['tas', 'windDir', 'windSpeed', 'timeAdd', 'minAlt']
    updateOFPRow(key, field, numFields.includes(field) ? Number(value) : value)
  }

  const handleRecalc = () => {
    recalculateOFP()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Operational Flight Plan</h2>
        <Button size="sm" onClick={handleRecalc}>Recalculate</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono border-collapse">
          <thead>
            <tr className="bg-[var(--secondary)]">
              {['Leg', 'Min Alt', 'Plan Alt', 'TAS', 'Wind°', 'Wind kt', 'TC', 'WCA', 'TH', 'MH', 'Dist', 'GS', 'Time', 'Acc', 'Fuel Rem'].map(h => (
                <th key={h} className="px-2 py-1 text-left border border-[var(--border)] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ofpRows.map((row, i) => (
              <tr key={row.key} className="border-b border-[var(--border)] hover:bg-[var(--accent)]">
                <td className="px-2 py-1 border border-[var(--border)] max-w-[120px] truncate">{row.description}</td>
                <td className="px-1 border border-[var(--border)]">
                  <Input className="h-7 w-16 text-xs" value={row.minAlt} onChange={e => handleChange(row.key, 'minAlt', e.target.value)} />
                </td>
                <td className="px-1 border border-[var(--border)]">
                  <Input className="h-7 w-16 text-xs" value={row.planAlt} onChange={e => handleChange(row.key, 'planAlt', e.target.value)} />
                </td>
                <td className="px-1 border border-[var(--border)]">
                  <Input className="h-7 w-14 text-xs" type="number" value={row.tas} onChange={e => handleChange(row.key, 'tas', e.target.value)} />
                </td>
                <td className="px-1 border border-[var(--border)]">
                  <Input className="h-7 w-14 text-xs" type="number" value={row.windDir} onChange={e => handleChange(row.key, 'windDir', e.target.value)} />
                </td>
                <td className="px-1 border border-[var(--border)]">
                  <Input className="h-7 w-14 text-xs" type="number" value={row.windSpeed} onChange={e => handleChange(row.key, 'windSpeed', e.target.value)} />
                </td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.trueCourse.toFixed(0)}°</td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.wca.toFixed(1)}°</td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.trueHeading.toFixed(0)}°</td>
                <td className="px-2 py-1 border border-[var(--border)] font-bold">{row.magHeading.toFixed(0)}°</td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.distLeg.toFixed(1)}</td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.gs.toFixed(0)}</td>
                <td className="px-2 py-1 border border-[var(--border)]">{formatTime(row.timeLeg)}</td>
                <td className="px-2 py-1 border border-[var(--border)]">{formatTime(row.timeAccRaw)}</td>
                <td className="px-2 py-1 border border-[var(--border)]">{row.fuelRem.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ofpRows.length === 0 && (
        <Card>
          <p className="text-[var(--muted-foreground)]">Build a route with at least 2 waypoints to generate OFP.</p>
        </Card>
      )}

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setStep('weather')}>← Weather</Button>
        <Button onClick={() => setStep('wnb')}>W&B →</Button>
      </div>
    </div>
  )
}
