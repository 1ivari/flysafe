export interface MetarData {
  raw: string
  station: string
  time: string
  wind: string
  visibility: string
  ceiling: string
  temperature: string
  dewpoint: string
  altimeter: string
  flightRules: 'VFR' | 'MVFR' | 'IFR' | 'LIFR'
}

export function classifyFlightRules(visibilityMeters: number, ceilingFeet: number | null): 'VFR' | 'MVFR' | 'IFR' | 'LIFR' {
  const visSM = visibilityMeters / 1609.34
  if (ceilingFeet !== null && ceilingFeet < 500 || visSM < 1) return 'LIFR'
  if (ceilingFeet !== null && ceilingFeet < 1000 || visSM < 3) return 'IFR'
  if (ceilingFeet !== null && ceilingFeet < 3000 || visSM < 5) return 'MVFR'
  return 'VFR'
}

export function flightRulesColor(rules: string): string {
  switch (rules) {
    case 'VFR': return '#22c55e'
    case 'MVFR': return '#3b82f6'
    case 'IFR': return '#ef4444'
    case 'LIFR': return '#ec4899'
    default: return '#64748b'
  }
}

const AVWX_BASE = 'https://avwx.rest/api'

export async function fetchMetar(icao: string): Promise<string[]> {
  // Use aviationweather.gov ADDS text service (no API key needed)
  try {
    const url = `https://aviationweather.gov/api/data/metar?ids=${icao}&format=raw&taf=false&hours=5`
    const res = await fetch(url)
    if (!res.ok) return []
    const text = await res.text()
    return text.trim().split('\n').filter(Boolean)
  } catch {
    return []
  }
}

export async function fetchTaf(icao: string): Promise<string> {
  try {
    const url = `https://aviationweather.gov/api/data/taf?ids=${icao}&format=raw`
    const res = await fetch(url)
    if (!res.ok) return ''
    return (await res.text()).trim()
  } catch {
    return ''
  }
}
