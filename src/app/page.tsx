'use client'
import { StepNav } from '@/components/StepNav'
import { BasicDataForm } from '@/components/BasicDataForm'
import { RouteMap } from '@/components/map/RouteMap'
import { WeatherPanel } from '@/components/weather/WeatherPanel'
import { OFPTable } from '@/components/ofp/OFPTable'
import { WnBPanel } from '@/components/wnb/WnBPanel'
import { Summary } from '@/components/Summary'
import { useFlightStore } from '@/stores/flightStore'

export default function Home() {
  const { step } = useFlightStore()

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-[var(--card)] border-b border-[var(--border)] px-4 py-2 flex items-center gap-2">
        <span className="text-xl">✈️</span>
        <h1 className="text-lg font-bold">FlySafe</h1>
        <span className="text-xs text-[var(--muted-foreground)]">VFR Flight Planner</span>
      </header>
      <StepNav />
      <main className="flex-1 overflow-y-auto">
        {step === 'basic' && <BasicDataForm />}
        {step === 'route' && <RouteMap />}
        {step === 'weather' && <WeatherPanel />}
        {step === 'ofp' && <OFPTable />}
        {step === 'wnb' && <WnBPanel />}
        {step === 'summary' && <Summary />}
      </main>
    </div>
  )
}
