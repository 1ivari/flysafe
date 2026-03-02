import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

let cachedAirports: any[] | null = null

export async function GET() {
  if (!cachedAirports) {
    const filePath = path.join(process.cwd(), 'src/data/Airports.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    // Filter to Finnish (EF) + nearby Nordic airports for performance
    cachedAirports = data.filter((a: any) =>
      a.ident?.startsWith('EF') || a.ident?.startsWith('ES') || a.ident?.startsWith('EE') ||
      (a.latitude_deg >= 58 && a.latitude_deg <= 72 && a.longitude_deg >= 18 && a.longitude_deg <= 32)
    )
  }
  return NextResponse.json(cachedAirports)
}
