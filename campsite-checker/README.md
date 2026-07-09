# 🏕️ CampWatch

Never miss a campsite cancellation. CampWatch monitors BC Parks and Recreation.gov for your target dates and emails you the moment a spot opens up.

**Stack:** React · Vite · TypeScript · TanStack Query · Tailwind CSS · Node.js · Express · SQLite · Resend

---

## Project Structure

```
campsite-checker/
├── client/   # React + Vite frontend
└── server/   # Node.js + Express backend
```

---

## Setup

### 1. Frontend

```bash
cd client
npm install
npm run dev       # → http://localhost:5173
```

### 2. Backend

```bash
cd server
npm install
cp .env.example .env    # fill in your API keys
npm run dev       # → http://localhost:3001
```

### 3. Environment variables (server/.env)

| Variable | Where to get it |
|---|---|
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier sends 3 000 emails/month |
| `EMAIL_FROM` | A verified sender in your Resend dashboard |
| `RECREATION_GOV_API_KEY` | [ridb.recreation.gov](https://ridb.recreation.gov) — free, instant |

---

## How It Works

1. **Add an alert** — pick a park, your target dates, site type, and email
2. **The server checks hourly** using `node-cron`
3. **Recreation.gov**: hits the official RIDB availability API
4. **BC Parks**: hits the Aspira/ReservAct REST API that the booking site uses
5. **When a spot opens** — you get an email with a direct booking link

---

## Deployment

| Part | Recommended |
|---|---|
| Frontend | [Vercel](https://vercel.com) (free) |
| Backend | [Railway](https://railway.app) or [Render](https://render.com) (free tier) |

Set `VITE_API_URL` in Vercel to point at your deployed backend URL.

---

## API Endpoints

```
GET    /api/alerts        List all alerts
POST   /api/alerts        Create a new alert
DELETE /api/alerts/:id    Remove an alert
GET    /api/health        Health check
```
