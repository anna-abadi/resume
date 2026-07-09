export type CampSystem = 'bcparks' | 'recreation.gov'

export type SiteType = 'tent' | 'rv' | 'cabin' | 'any'

export type AlertStatus = 'active' | 'found' | 'error'

export interface Alert {
  id: string
  system: CampSystem
  parkId: string
  parkName: string
  siteType: SiteType
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
  email: string
  status: AlertStatus
  lastChecked: string | null
  createdAt: string
  foundAt: string | null
  bookingUrl: string | null
}

export interface CreateAlertPayload {
  system: CampSystem
  parkId: string
  parkName: string
  siteType: SiteType
  startDate: string
  endDate: string
  email: string
}

export interface Campground {
  id: string
  name: string
  location?: string
}
