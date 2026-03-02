export interface Airport {
  id: number
  ident: string
  type: string
  name: string
  latitude_deg: number
  longitude_deg: number
  elevation_ft: number | null
  continent: string
  iso_country: string
  iso_region: string
  municipality: string
  scheduled_service: string
  gps_code: string
  iata_code: string
  local_code: string
  home_link: string
  wikipedia_link: string
  keywords: string
  runways?: Runway[]
  frequencies?: Frequency[]
}

export interface Runway {
  id: number
  airport_ref: number
  airport_ident: string
  length_ft: number
  width_ft: number
  surface: string
  lighted: number
  closed: number
  le_ident: string
  le_latitude_deg: number
  le_longitude_deg: number
  le_elevation_ft: number
  le_heading_degT: number
  he_ident: string
  he_latitude_deg: number
  he_longitude_deg: number
  he_elevation_ft: number
  he_heading_degT: number
}

export interface Frequency {
  id: number
  airport_ref: number
  airport_ident: string
  type: string
  description: string
  frequency_mhz: number
}

export interface Waypoint {
  key: string
  type: 'airport' | 'vfr-rep' | 'custom' | 'ifr'
  ident: string
  name: string
  coordinates: [number, number] // [lng, lat]
  airport?: Airport
}

export interface OFPRow {
  key: string
  startCoord: [number, number]
  midCoord: [number, number]
  endCoord: [number, number]
  description: string
  minAlt: string
  planAlt: string
  tas: number
  windDir: number
  windSpeed: number
  trueCourse: number
  wca: number
  trueHeading: number
  declination: number
  magHeading: number
  deviation: number
  compassHeading: number
  distLeg: number
  distAcc: number
  gs: number
  timeLeg: number
  timeLegRaw: number
  timeAdd: number
  timeAcc: number
  timeAccRaw: number
  eto: string
  ato: string
  fuelRem: number
  remark: string
}

export interface AircraftProfile {
  id: string
  type: string
  registration: string
  basicWeight: number
  arms: {
    bw: number
    frontSeats: number
    rearSeats: number
    baggage1: number
    baggage2: number
    fuel: number
  }
  fuelCapacity: number
  fuelBurn: number // gal/hr cruise
  cruiseTas: number
  maxTakeoffWeight: number
  envelope: { weight: number; arm: number }[]
}

export interface BasicData {
  date: string
  departure: string
  destination: string
  alternate: string
  rampFuel: number
  taxiFuel: number
  fuelConsumption: number
  aircraftId: string
}

export interface WnBInput {
  basicWeight: number
  basicArm: number
  frontSeats: number
  rearSeats: number
  baggage1: number
  baggage2: number
  fuelGal: number
}

export interface FuelPlan {
  taxiFuel: number
  climbFuel: number
  cruiseFuel: number
  descentFuel: number
  tripFuel: number
  reserveFuel: number // 45 min
  alternateFuel: number
  totalRequired: number
  rampFuel: number
  endurance: number // minutes
}

export interface VfrRepPoint {
  type: 'Feature'
  properties: { name: string; desc: string; type: string }
  geometry: { type: 'Point'; coordinates: [number, number] }
}

export interface AirspaceFeature {
  type: 'Feature'
  geometry: { type: 'Polygon'; coordinates: number[][][] }
  properties: { name: string; upper: string; lower: string; class?: string }
}

export type FlightStep = 'basic' | 'route' | 'weather' | 'ofp' | 'wnb' | 'summary'
