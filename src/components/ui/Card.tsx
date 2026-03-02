import { cn } from '@/lib/cn'

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm', className)} {...props} />
}
