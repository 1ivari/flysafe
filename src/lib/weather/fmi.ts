import { MS_TO_KNOTS, FEET_TO_METERS } from '@/lib/aviation/constants'

export interface FMIWindData {
  time: Date
  windDirection: number
  windSpeed: number // knots
  temperature: number
  humidity: number
}

function parseXML(data: string, timeStep: number): FMIWindData[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(data, 'text/xml')

  const fields = Array.from(doc.getElementsByTagName('swe:field'))
  const fieldNames = fields.map(f => f.getAttribute('name') || '')

  const timePeriod = doc.getElementsByTagName('gml:TimePeriod')[0]
  if (!timePeriod) return []
  const beginTime = new Date(timePeriod.childNodes[1]?.textContent || '')

  const tupleList = doc.getElementsByTagName('gml:doubleOrNilReasonTupleList')[0]
  if (!tupleList) return []

  const values = tupleList.textContent!
    .split(/\s+/)
    .filter(v => v !== '' && v !== '\n')
    .map(v => v === 'NaN' ? 0 : parseFloat(v))

  const results: FMIWindData[] = []
  let row = 0
  for (let i = 0; i < values.length; i += fieldNames.length) {
    const obj: Record<string, number> = {}
    for (let j = 0; j < fieldNames.length; j++) {
      obj[fieldNames[j]] = values[i + j]
    }
    results.push({
      time: new Date(beginTime.getTime() + row * timeStep * 60 * 1000),
      windDirection: obj['WindDirection'] || 0,
      windSpeed: (obj['WindSpeedMS'] || 0) * MS_TO_KNOTS,
      temperature: obj['Temperature'] || 0,
      humidity: obj['Humidity'] || 0,
    })
    row++
  }
  return results
}

export async function fetchFMIWind(lat: number, lng: number, altitudeFt: string): Promise<FMIWindData[]> {
  let height: number
  const upper = altitudeFt.toUpperCase()
  if (upper.includes('FL')) {
    height = parseInt(upper.replace('FL', '')) * 100 * FEET_TO_METERS
  } else {
    height = parseInt(altitudeFt) * FEET_TO_METERS
  }
  if (height < 20) height = 20

  const timeStep = 60
  const numResults = 5
  const start = new Date()
  const end = new Date(start.getTime() + numResults * timeStep * 60 * 1000)

  const url = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::hybrid::point::multipointcoverage&latlon=${lat.toFixed(2)},${lng.toFixed(2)}&height=${Math.round(height)}&timestep=${timeStep}&starttime=${start.toISOString()}&endtime=${end.toISOString()}`

  const res = await fetch(url)
  const text = await res.text()
  return parseXML(text, timeStep)
}
