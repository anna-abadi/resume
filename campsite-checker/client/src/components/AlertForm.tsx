import { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Search, Plus, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn } from '../lib/utils'
import { createAlert } from '../api/alerts'
import { searchCampgrounds } from '../api/campgrounds'
import type { CampSystem, SiteType, Campground } from '../types'

const today = new Date().toISOString().split('T')[0]

const defaultForm = {
  system: 'bcparks' as CampSystem,
  parkId: '',
  parkName: '',
  siteType: 'tent' as SiteType,
  startDate: '',
  endDate: '',
  email: '',
}

export default function AlertForm() {
  const qc = useQueryClient()
  const [form, setForm] = useState(defaultForm)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Campground[]>([])
  const [searching, setSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Debounced campground search
  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timer = setTimeout(async () => {
      setSearching(true)
      const found = await searchCampgrounds(query, form.system).catch(() => [])
      setResults(found)
      setShowDropdown(found.length > 0)
      setSearching(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [query, form.system])

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) setShowDropdown(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const mutation = useMutation({
    mutationFn: createAlert,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alerts'] })
      setForm(defaultForm)
      setQuery('')
      toast.success('Alert created! We\'ll email you when a spot opens.')
    },
    onError: (err: Error) => toast.error(err.message),
  })

  function selectPark(park: Campground) {
    setForm(f => ({ ...f, parkId: park.id, parkName: park.name }))
    setQuery(park.name)
    setShowDropdown(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.parkId) { toast.error('Please select a park from the list'); return }
    mutation.mutate(form)
  }

  const inputCls = 'w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition'
  const labelCls = 'block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1'

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-stone-800">Add a new alert</h2>

      {/* System */}
      <div>
        <label className={labelCls}>Reservation System</label>
        <div className="flex gap-2">
          {(['bcparks', 'recreation.gov'] as CampSystem[]).map(sys => (
            <button
              key={sys}
              type="button"
              onClick={() => { setForm(f => ({ ...f, system: sys, parkId: '', parkName: '' })); setQuery('') }}
              className={cn(
                'flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition',
                form.system === sys
                  ? 'bg-forest-700 text-white border-forest-700'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-forest-400',
              )}
            >
              {sys === 'bcparks' ? 'BC Parks' : 'Recreation.gov'}
            </button>
          ))}
        </div>
      </div>

      {/* Park search */}
      <div ref={dropdownRef} className="relative">
        <label className={labelCls}>Park / Campground</label>
        <div className="relative">
          <input
            className={cn(inputCls, 'pl-9')}
            placeholder={`Search ${form.system === 'bcparks' ? 'BC Parks' : 'Recreation.gov'} campgrounds…`}
            value={query}
            onChange={e => { setQuery(e.target.value); setForm(f => ({ ...f, parkId: '', parkName: '' })) }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          </span>
        </div>
        {showDropdown && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden">
            {results.map(park => (
              <li key={park.id}>
                <button
                  type="button"
                  onClick={() => selectPark(park)}
                  className="w-full text-left px-4 py-2.5 hover:bg-forest-50 transition text-sm"
                >
                  <span className="font-medium text-stone-800">{park.name}</span>
                  {park.location && <span className="ml-2 text-stone-400 text-xs">{park.location}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Check-in</label>
          <input
            type="date"
            className={inputCls}
            min={today}
            value={form.startDate}
            onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className={labelCls}>Check-out</label>
          <input
            type="date"
            className={inputCls}
            min={form.startDate || today}
            value={form.endDate}
            onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
            required
          />
        </div>
      </div>

      {/* Site type */}
      <div>
        <label className={labelCls}>Site Type</label>
        <select
          className={inputCls}
          value={form.siteType}
          onChange={e => setForm(f => ({ ...f, siteType: e.target.value as SiteType }))}
        >
          <option value="any">Any type</option>
          <option value="tent">Tent</option>
          <option value="rv">RV / Vehicle</option>
          <option value="cabin">Cabin</option>
        </select>
      </div>

      {/* Email */}
      <div>
        <label className={labelCls}>Your Email</label>
        <input
          type="email"
          className={inputCls}
          placeholder="you@example.com"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full flex items-center justify-center gap-2 bg-forest-700 hover:bg-forest-800 text-white font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
      >
        {mutation.isPending
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating…</>
          : <><Plus className="w-4 h-4" /> Watch this campsite</>}
      </button>
    </form>
  )
}
