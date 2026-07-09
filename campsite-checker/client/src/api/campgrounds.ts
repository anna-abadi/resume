import type { Campground, CampSystem } from '../types'

const REC_GOV_KEY = import.meta.env.VITE_RECREATION_GOV_API_KEY as string | undefined

// Recreation.gov public RIDB API
async function searchRecreationGov(query: string): Promise<Campground[]> {
  const key = REC_GOV_KEY ?? 'DEMO_KEY'
  const url = new URL('https://ridb.recreation.gov/api/v1/facilities')
  url.searchParams.set('query', query)
  url.searchParams.set('activity', '9') // 9 = Camping
  url.searchParams.set('limit', '8')
  url.searchParams.set('apikey', key)

  const res = await fetch(url.toString())
  if (!res.ok) return []
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.RECDATA ?? []).map((f: any) => ({
    id: String(f.FacilityID),
    name: f.FacilityName,
    location: [f.City, f.AddressStateCode].filter(Boolean).join(', '),
  }))
}

// BC Parks — queries the Aspira reservation API
async function searchBCParks(query: string): Promise<Campground[]> {
  // BC Parks uses Aspira's ReservAct platform. The search endpoint:
  const url = `https://camping.bcparks.ca/api/resourcelocation/list?lang=en-CA&q=${encodeURIComponent(query)}&limit=8`
  const res = await fetch(url).catch(() => null)
  if (!res?.ok) return []
  const data = await res.json()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((p: any) => ({
    id: String(p.resourceLocationId ?? p.id),
    name: p.localizedValues?.[0]?.name ?? p.name ?? 'Unknown',
    location: 'BC, Canada',
  }))
}

export async function searchCampgrounds(
  query: string,
  system: CampSystem,
): Promise<Campground[]> {
  if (query.trim().length < 2) return []
  if (system === 'recreation.gov') return searchRecreationGov(query)
  return searchBCParks(query)
}
