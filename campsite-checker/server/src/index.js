require('dotenv').config()

const express = require('express')
const cors = require('cors')
const alertRoutes = require('./routes/alerts')
const { startScheduler } = require('./services/checker')

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.use('/api/alerts', alertRoutes)

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

app.listen(PORT, () => {
  console.log(`\n🏕️  CampWatch server running on http://localhost:${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health\n`)
  startScheduler()
})
