import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn, timeAgo, formatDate, SYSTEM_LABELS, SITE_TYPE_LABELS } from '../lib/utils'
import { deleteAlert } from '../api/alerts'
import type { Alert } from '../types'

interface Props {
  alert: Alert
}

export default function AlertCard({ alert }: Props) {
  const qc = useQueryClient()
  const del = useMutation({
    mutationFn: () => deleteAlert(alert.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alerts'] })
      toast.success('Alert removed')
    },
    onError: () => toast.error('Could not remove alert'),
  })

  const statusConfig = {
    active: {
      dot: <span className="pulse-dot" />,
      label: 'Watching',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    found: {
      dot: <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />,
      label: 'Spot found!',
      color: 'text-sky-700 bg-sky-50 border-sky-200',
    },
    error: {
      dot: <span className="inline-block w-2 h-2 rounded-full bg-red-400" />,
      label: 'Check failed',
      color: 'text-red-700 bg-red-50 border-red-200',
    },
  }[alert.status]

  return (
    <div className={cn(
      'bg-white rounded-2xl border p-5 shadow-sm hover:shadow-md transition-shadow',
      alert.status === 'found' ? 'border-sky-300 ring-1 ring-sky-200' : 'border-stone-100',
    )}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="min-w-0">
          <h3 className="font-semibold text-stone-800 truncate">{alert.parkName}</h3>
          <span className="text-xs text-stone-400">{SYSTEM_LABELS[alert.system]}</span>
        </div>
        <span className={cn('flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border shrink-0', statusConfig.color)}>
          {statusConfig.dot}
          {statusConfig.label}
        </span>
      </div>

      {/* Details */}
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-4">
        <div>
          <dt className="text-xs text-stone-400 uppercase tracking-wide">Dates</dt>
          <dd className="text-stone-700 font-medium">
            {formatDate(alert.startDate)} – {formatDate(alert.endDate)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-stone-400 uppercase tracking-wide">Site type</dt>
          <dd className="text-stone-700 font-medium">{SITE_TYPE_LABELS[alert.siteType]}</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-400 uppercase tracking-wide">Notify</dt>
          <dd className="text-stone-700 font-medium truncate">{alert.email}</dd>
        </div>
        <div>
          <dt className="text-xs text-stone-400 uppercase tracking-wide">Last checked</dt>
          <dd className="text-stone-700 font-medium flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-stone-400" />
            {timeAgo(alert.lastChecked)}
          </dd>
        </div>
      </dl>

      {/* Error note */}
      {alert.status === 'error' && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          Last availability check failed. Will retry automatically.
        </div>
      )}

      {/* Found! Book now */}
      {alert.status === 'found' && alert.bookingUrl && (
        <a
          href={alert.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold py-2 rounded-xl transition mb-3"
        >
          <ExternalLink className="w-4 h-4" />
          Book now before it's gone!
        </a>
      )}

      {/* Delete */}
      <button
        onClick={() => del.mutate()}
        disabled={del.isPending}
        className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-red-500 transition disabled:opacity-50"
      >
        <Trash2 className="w-3.5 h-3.5" />
        {del.isPending ? 'Removing…' : 'Remove alert'}
      </button>
    </div>
  )
}
