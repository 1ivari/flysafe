# FlySafe v2 — Full Rebuild

## Context
This is a GA (General Aviation) flight planning web app originally built in 2023 with CRA + React 18 + JS.
Rebuild from scratch with modern 2026 tech. The existing `src/` is reference material — reuse aviation logic if quality is good, rebuild everything else.

The user (Speedy) is a CPL holder flying DA40s in Finland. This app is for VFR flight preparation.

## Tech Stack
- Next.js 15 (App Router), TypeScript (strict), Tailwind CSS v4 + shadcn/ui
- MapLibre GL JS for maps, Zustand for state, Supabase for auth/DB/storage
- @react-pdf/renderer for OFP PDF, next-pwa for PWA, Vitest for tests

## Features

### 1. Route Builder (core)
- Interactive MapLibre map, search airports by ICAO/city (fuzzy), VFR reporting points
- Click map for custom waypoints, drag to reorder, great circle route lines
- Waypoint popup: airport info, runways, frequencies
- Finnish airspace overlay (existing airspaces.json, vfrRep.json, ifr.json, waypoints.geojson)
- Airport data from existing Airports.json

### 2. Weather
- METAR (last 5) + TAF for route airports
- Wind data by altitude from FMI (opendata.fmi.fi)
- Flight rules color coding (VFR/MVFR/IFR/LIFR)

### 3. OFP
- Editable table: min alt, plan alt, TAS, wind dir/speed
- Auto-calc: magnetic heading, GS, ETE, ETA, fuel per leg
- Wind correction (reuse windCorrection.js logic), magnetic declination
- PDF export, print-friendly

### 4. Weight & Balance
- DA40 profile, input weights, calc CG, plot on envelope, warn if OOL
- Support custom aircraft profiles saved to Supabase

### 5. Fuel Planning
- Burn by phase (taxi/climb/cruise/descent), trip/reserve(45min)/alternate fuel
- Endurance calc

### 6. Aircraft Profiles
- Pre-loaded DA40, user custom profiles, performance tables

### 7. Auth & User Data
- Supabase auth (email + Google), save plans & aircraft per user

### 8. UI/UX
- Mobile-first, step flow: Basic Data → Route → Weather → OFP → W&B → Summary
- Dark mode, progress indicator, PWA installable

## Project Structure
src/app/ (Next.js pages), src/components/, src/lib/aviation/, src/lib/supabase/,
src/lib/weather/, src/data/, src/stores/, src/types/

## Reference Files (v1 src/)
- utils/windCorrection.js, utils/calculateOFP.js
- data/aircraftBasicInfo.js, data/Airports.json, data/airspaces.json
- data/vfrRep.json, data/waypoints.geojson, data/ifr.json
- components/FmiDataProviderV2.jsx, context/ofpReducer.jsx

## Constraints
- Aviation calcs must be accurate, proper terminology
- Finnish airspace data included, works on mobile Safari/Chrome
- App functional without Supabase (guest mode with local state)
- Supabase schema SQL included

## Deliverable
Working Next.js app on v2 branch, ready for npm run dev.
