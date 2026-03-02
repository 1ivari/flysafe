'use client'
import { useFlightStore } from '@/stores/flightStore'
import type { FlightStep } from '@/types'
import { cn } from '@/lib/cn'

const STEPS: { key: FlightStep; label: string; icon: string }[] = [
  { key: 'basic', label: 'Basic', icon: '✈️' },
  { key: 'route', label: 'Route', icon: '🗺️' },
  { key: 'weather', label: 'Weather', icon: '🌤️' },
  { key: 'ofp', label: 'OFP', icon: '📋' },
  { key: 'wnb', label: 'W&B', icon: '⚖️' },
  { key: 'summary', label: 'Summary', icon: '📊' },
]

export function StepNav() {
  const { step, setStep } = useFlightStore()
  return (
    <nav className="flex gap-1 overflow-x-auto p-2 bg-[var(--card)] border-b border-[var(--border)]">
      {STEPS.map((s, i) => (
        <button
          key={s.key}
          onClick={() => setStep(s.key)}
          className={cn(
            'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors',
            step === s.key
              ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
              : 'text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
          )}
        >
          <span>{s.icon}</span>
          <span className="hidden sm:inline">{s.label}</span>
        </button>
      ))}
    </nav>
  )
}
