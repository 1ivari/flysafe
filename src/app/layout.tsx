import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlySafe - VFR Flight Planner',
  description: 'GA flight planning for Finnish airspace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  )
}
