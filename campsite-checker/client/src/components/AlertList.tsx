import { useQuery } from '@tanstack/react-query'
import { Tent, Loader2 } from 'lucide-react'
import { getAlerts } from '../api/alerts'
import AlertCard from './AlertCard'

export default function AlertList() {
  const { data: alerts, isLoading, isError } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
    refetchInterval: 30_000, // re-poll every 30s so status stays fresh
  })

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-stone-400">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm">Loading your alerts…</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-400 text-sm">
        Couldn't connect to the server. Make sure the backend is running on port 3001.
      </div>
    )
  }

  if (!alerts?.length) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-stone-400">
        <div className="bg-stone-100 rounded-full p-5">
          <Tent className="w-10 h-10 text-stone-300" />
        </div>
        <p className="text-sm text-center max-w-xs">
          No active alerts yet. Add one above and we'll watch for cancellations around the clock.
        </p>
      </div>
    )
  }

  const found = alerts.filter(a => a.status === 'found')
  const active = alerts.filter(a => a.status !== 'found')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-stone-800">Your alerts</h2>
        <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full">
          {alerts.length} watching
        </span>
      </div>

      {found.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-sky-600 uppercase tracking-wide">🎉 Availability found!</p>
          {found.map(a => <AlertCard key={a.id} alert={a} />)}
        </div>
      )}

      {active.length > 0 && (
        <div className="space-y-3">
          {found.length > 0 && <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide">Still watching</p>}
          {active.map(a => <AlertCard key={a.id} alert={a} />)}
        </div>
      )}
    </div>
  )
}
