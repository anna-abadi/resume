const express = require('express')
const { v4: uuid } = require('uuid')
const { listAlerts, getAlert, insertAlert, deleteAlert } = require('../db')

const router = express.Router()

// GET /api/alerts
router.get('/', (req, res) => {
  res.json(listAlerts())
})

// POST /api/alerts
router.post('/', (req, res) => {
  const { system, parkId, parkName, siteType, startDate, endDate, email } = req.body

  if (!system || !parkId || !parkName || !startDate || !endDate || !email) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  if (!['bcparks', 'recreation.gov'].includes(system)) {
    return res.status(400).json({ message: 'Invalid system' })
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ message: 'startDate must be before endDate' })
  }

  if (new Date(endDate) < new Date()) {
    return res.status(400).json({ message: 'Dates must be in the future' })
  }

  const alert = insertAlert({
    id: uuid(),
    system,
    parkId,
    parkName,
    siteType: siteType ?? 'any',
    startDate,
    endDate,
    email,
    createdAt: new Date().toISOString(),
  })

  res.status(201).json(alert)
})

// DELETE /api/alerts/:id
router.delete('/:id', (req, res) => {
  const existing = getAlert(req.params.id)
  if (!existing) return res.status(404).json({ message: 'Alert not found' })
  deleteAlert(req.params.id)
  res.status(204).end()
})

module.exports = router
