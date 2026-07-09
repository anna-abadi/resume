const axios = require('axios')

// ─── Recreation.gov ──────────────────────────────────────────────────────────
//
// Availability API: returns per-campsite availability for a full month.
// We check every month that overlaps with [startDate, endDate].
//
async function checkRecreationGov(alert) {
  const { parkId, startDate, endDate, siteType } = alert
  const API_KEY = process.env.RECREATION_GOV_API_KEY ?? 'DEMO_KEY'

  // Collect all months between startDate and endDate
  const months = getMonthsInRange(startDate, endDate)
  const checkIn = new Date(startDate)
  const checkOut = new Date(endDate)

  for (const monthStart of months) {
    const url = `https://www.recreation.gov/api/camps/availability/campground/${parkId}/month`
    const { data } = await axios.get(url, {
      params: { start_date: monthStart.toISOString() },
      headers: { apikey: API_KEY },
      timeout: 10_000,
    })

    for (const [, site] of Object.entries(data.campsites ?? {})) {
      // Filter by site type if requested
      if (siteType !== 'any') {
        const type = (site.campsite_type ?? '').toLowerCase()
        if (siteType === 'tent' && !type.includes('tent') && !type.includes('standard')) continue
        if (siteType === 'rv' && !type.includes('rv') && !type.includes('electric')) continue
        if (siteType === 'cabin' && !type.includes('cabin') && !type.includes('shelter')) continue
      }

      const avail = site.availabilities ?? {}

      // Check if ALL nights in the range are available
      const nights = getDatesInRange(checkIn, checkOut)
      const allFree = nights.every(d => {
        const key = d.toISOString().split('T')[0] + 'T00:00:00Z'
        return avail[key] === 'Available'
      })

      if (allFree) {
        const bookingUrl = `https://www.recreation.gov/camping/campgrounds/${parkId}`
        return { found: true, bookingUrl }
      }
    }
  }

  return { found: false }
}

// ─── BC Parks ────────────────────────────────────────────────────────────────
//
// BC Parks uses Aspira's ReservAct platform. This hits the same REST API
// the browser uses when you search on camping.bcparks.ca.
//
async function checkBCParks(alert) {
  const { parkId, startDate, endDate, siteType } = alert

  const equipmentMap = {
    tent:  { equipmentCategoryId: -32768, subEquipmentCategoryId: -32768 },
    rv:    { equipmentCategoryId: -32767, subEquipmentCategoryId: -32767 },
    cabin: { equipmentCategoryId: -32766, subEquipmentCategoryId: -32766 },
    any:   { equipmentCategoryId: -32768, subEquipmentCategoryId: -32768 },
  }
  const eq = equipmentMap[siteType] ?? equipmentMap.any

  const url = 'https://camping.bcparks.ca/api/availability/map'
  const { data } = await axios.get(url, {
    params: {
      resourceLocationId: parkId,
      bookingCategoryId: 0,
      startDate,
      endDate,
      isReserving: true,
      getDailyAvailability: false,
      partySize: 1,
      numEquipment: 1,
      ...eq,
      generateAlternateEnds: false,
    },
    timeout: 10_000,
  })

  // The response contains mapItems; look for any with available slots
  const items = data?.mapItems ?? data ?? []
  const available = Array.isArray(items)
    ? items.some(item => item.availability?.isAvailable === true || item.isAvailable === true)
    : false

  if (available) {
    const bookingUrl = `https://camping.bcparks.ca/create-booking?resourceLocationId=${parkId}&startDate=${startDate}&endDate=${endDate}`
    return { found: true, bookingUrl }
  }

  return { found: false }
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────

async function checkAvailability(alert) {
  if (alert.system === 'recreation.gov') return checkRecreationGov(alert)
  if (alert.system === 'bcparks') return checkBCParks(alert)
  throw new Error(`Unknown system: ${alert.system}`)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMonthsInRange(startDate, endDate) {
  const months = []
  const cur = new Date(startDate)
  cur.setDate(1)
  const end = new Date(endDate)
  while (cur <= end) {
    months.push(new Date(cur))
    cur.setMonth(cur.getMonth() + 1)
  }
  return months
}

function getDatesInRange(start, end) {
  const dates = []
  const cur = new Date(start)
  while (cur < end) {
    dates.push(new Date(cur))
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

module.exports = { checkAvailability }
