'use client'
import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import type { Airport } from '@/types'
import { Input } from '@/components/ui/Input'

interface Props {
  airports: Airport[]
  onSelect: (airport: Airport) => void
}

export function AirportSearch({ airports, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const fuse = useMemo(() => new Fuse(airports, {
    keys: ['ident', 'name', 'municipality'],
    threshold: 0.3,
    minMatchCharLength: 2,
  }), [airports])

  const results = useMemo(() => {
    if (query.length < 2) return []
    return fuse.search(query, { limit: 10 }).map(r => r.item)
  }, [query, fuse])

  return (
    <div className="relative flex-1 max-w-xs">
      <Input
        placeholder="Search ICAO / city..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
      />
      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-[var(--card)] border border-[var(--border)] rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map(a => (
            <button
              key={a.id}
              className="w-full text-left px-3 py-2 text-sm hover:bg-[var(--accent)] border-b border-[var(--border)] last:border-0"
              onClick={() => { onSelect(a); setQuery(''); setOpen(false) }}
            >
              <span className="font-mono font-bold">{a.ident}</span>
              <span className="ml-2 text-[var(--muted-foreground)]">{a.name}</span>
              {a.municipality && <span className="ml-1 text-xs text-[var(--muted-foreground)]">({a.municipality})</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
