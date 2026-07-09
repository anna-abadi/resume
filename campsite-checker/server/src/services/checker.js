const cron = require('node-cron')
const { getActiveAlerts, markChecked, markFound } = require('../db')
const { checkAvailability } = require('./campground-apis')
const { sendAvailabilityAlert } = require('./emailer')

async function runChecks() {
  const alerts = getActiveAlerts()
  if (!alerts.length) return

  console.log(`[checker] Running availability check for ${alerts.length} alert(s)…`)

  for (const alert of alerts) {
    // Skip alerts whose dates have already passed
    if (new Date(alert.endDate) < new Date()) {
      markChecked(alert.id, 'error')
      continue
    }

    try {
      const result = await checkAvailability(alert)

      if (result.found) {
        markFound(alert.id, result.bookingUrl)
        console.log(`[checker] ✅ Found availability for "${alert.parkName}" (${alert.id})`)

        try {
          await sendAvailabilityAlert({ ...alert, bookingUrl: result.bookingUrl })
          console.log(`[checker] 📧 Email sent to ${alert.email}`)
        } catch (emailErr) {
          console.error('[checker] Email failed:', emailErr.message)
        }
      } else {
        markChecked(alert.id, 'active')
        console.log(`[checker] ⏳ No availability yet for "${alert.parkName}"`)
      }
    } catch (err) {
      console.error(`[checker] Error checking "${alert.parkName}":`, err.message)
      markChecked(alert.id, 'error')
    }
  }
}

function startScheduler() {
  // Run every hour at :00
  cron.schedule('0 * * * *', runChecks)
  console.log('[checker] Scheduler started — checks run every hour')

  // Also run once immediately on startup
  runChecks().catch(console.error)
}

module.exports = { startScheduler, runChecks }
