const Database = require('better-sqlite3')
const path = require('path')

const DB_PATH = path.join(__dirname, '..', 'data', 'campwatch.db')

// Ensure data directory exists
const fs = require('fs')
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })

const db = new Database(DB_PATH)

// Enable WAL mode for better concurrent performance
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS alerts (
    id          TEXT PRIMARY KEY,
    system      TEXT NOT NULL,
    park_id     TEXT NOT NULL,
    park_name   TEXT NOT NULL,
    site_type   TEXT NOT NULL DEFAULT 'any',
    start_date  TEXT NOT NULL,
    end_date    TEXT NOT NULL,
    email       TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'active',
    last_checked TEXT,
    created_at  TEXT NOT NULL,
    found_at    TEXT,
    booking_url TEXT
  )
`)

// Map DB snake_case rows → camelCase objects for the API
function toAlert(row) {
  if (!row) return null
  return {
    id: row.id,
    system: row.system,
    parkId: row.park_id,
    parkName: row.park_name,
    siteType: row.site_type,
    startDate: row.start_date,
    endDate: row.end_date,
    email: row.email,
    status: row.status,
    lastChecked: row.last_checked ?? null,
    createdAt: row.created_at,
    foundAt: row.found_at ?? null,
    bookingUrl: row.booking_url ?? null,
  }
}

const queries = {
  list: db.prepare('SELECT * FROM alerts ORDER BY created_at DESC'),
  get:  db.prepare('SELECT * FROM alerts WHERE id = ?'),
  insert: db.prepare(`
    INSERT INTO alerts (id, system, park_id, park_name, site_type, start_date, end_date, email, status, created_at)
    VALUES (@id, @system, @parkId, @parkName, @siteType, @startDate, @endDate, @email, 'active', @createdAt)
  `),
  delete: db.prepare('DELETE FROM alerts WHERE id = ?'),
  setChecked: db.prepare('UPDATE alerts SET last_checked = ?, status = ? WHERE id = ?'),
  setFound: db.prepare('UPDATE alerts SET status = \'found\', found_at = ?, booking_url = ?, last_checked = ? WHERE id = ?'),
}

module.exports = {
  listAlerts: () => queries.list.all().map(toAlert),
  getAlert: (id) => toAlert(queries.get.get(id)),
  insertAlert: (data) => {
    queries.insert.run(data)
    return module.exports.getAlert(data.id)
  },
  deleteAlert: (id) => queries.delete.run(id),
  markChecked: (id, status = 'active') =>
    queries.setChecked.run(new Date().toISOString(), status, id),
  markFound: (id, bookingUrl) =>
    queries.setFound.run(new Date().toISOString(), bookingUrl, new Date().toISOString(), id),
  getActiveAlerts: () =>
    db.prepare("SELECT * FROM alerts WHERE status = 'active'").all().map(toAlert),
}
