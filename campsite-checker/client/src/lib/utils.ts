import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateStr: string | null): string {
  if (!dateStr) return 'never'
  return formatDistanceToNow(parseISO(dateStr), { addSuffix: true })
}

export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export const SYSTEM_LABELS: Record<string, string> = {
  bcparks: 'BC Parks',
  'recreation.gov': 'Recreation.gov',
}

export const SITE_TYPE_LABELS: Record<string, string> = {
  tent: 'Tent',
  rv: 'RV / Vehicle',
  cabin: 'Cabin',
  any: 'Any type',
}
