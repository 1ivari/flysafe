'use client'
import { useState } from 'react'
import { useFlightStore } from '@/stores/flightStore'
import { fetchMetar, fetchTaf, flightRulesColor, classifyFlightRules } from '@/lib/weather/metar'
import { fetchFMIWind } from '@/lib/weather/fmi'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface WxData {
  icao: string
  metars: string[]
  taf: string
}

export function WeatherPanel() {
  const { route, ofpRows, updateOFPRow, recalculateOFP, setStep } = useFlightStore()
  const [wxData, setWxData] = useState<WxData[]>([])
  const [loading, setLoading] = useState(false)
  const [fmiLoading, setFmiLoading] = useState(false)

  const airportWaypoints = route.filter(w => w.type === 'airport')

  const fetchWeather = async () => {
    setLoading(true)
    const results: WxData[] = []
    for (const wp of airportWaypoints) {
      const [metars, taf] = await Promise.all([fetchMetar(wp.ident), fetchTaf(wp.ident)])
      results.push({ icao: wp.ident, metars, taf })
    }
    setWxData(results)
    setLoading(false)
  }

  const fetchWinds = async () => {
    setFmiLoading(true)
    for (const row of ofpRows) {
      if (row.planAlt && row.midCoord[0] !== 0) {
        try {
          const data = await fetchFMIWind(row.midCoord[1], row.midCoord[0], row.planAlt)
          if (data.length > 1) {
            updateOFPRow(row.key, 'windDir', Math.round(data[1].windDirection))
            updateOFPRow(row.key, 'windSpeed', Math.round(data[1].windSpeed))
          }
          await new Promise(r => setTimeout(r, 500)) // rate limit
        } catch (e) {
          console.error('FMI error:', e)
        }
      }
    }
    recalculateOFP()
    setFmiLoading(false)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Weather</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={fetchWeather} disabled={loading || airportWaypoints.length === 0}>
            {loading ? 'Fetching...' : 'Fetch METAR/TAF'}
          </Button>
          <Button size="sm" variant="secondary" onClick={fetchWinds} disabled={fmiLoading || ofpRows.length === 0}>
            {fmiLoading ? 'Fetching...' : 'Fetch FMI Wind 💨'}
          </Button>
        </div>
      </div>

      {wxData.length === 0 && !loading && (
        <Card>
          <p className="text-[var(--muted-foreground)]">Add airports to your route, then fetch weather data.</p>
        </Card>
      )}

      {wxData.map(wx => (
        <Card key={wx.icao} className="space-y-2">
          <h3 className="font-bold font-mono text-lg">{wx.icao}</h3>
          <div>
            <h4 className="text-sm font-medium text-[var(--muted-foreground)]">METAR (last 5)</h4>
            {wx.metars.length > 0 ? (
              <div className="space-y-1 mt-1">
                {wx.metars.map((m, i) => (
                  <pre key={i} className="text-xs font-mono bg-[var(--secondary)] p-2 rounded whitespace-pre-wrap">{m}</pre>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-foreground)]">No METAR available</p>
            )}
          </div>
          {wx.taf && (
            <div>
              <h4 className="text-sm font-medium text-[var(--muted-foreground)]">TAF</h4>
              <pre className="text-xs font-mono bg-[var(--secondary)] p-2 rounded whitespace-pre-wrap mt-1">{wx.taf}</pre>
            </div>
          )}
        </Card>
      ))}

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setStep('route')}>← Route</Button>
        <Button onClick={() => setStep('ofp')}>OFP →</Button>
      </div>
    </div>
  )
}
