import type { Alert, CreateAlertPayload } from '../types'

const BASE = '/api'

export async function getAlerts(): Promise<Alert[]> {
  const res = await fetch(`${BASE}/alerts`)
  if (!res.ok) throw new Error('Failed to load alerts')
  return res.json()
}

export async function createAlert(payload: CreateAlertPayload): Promise<Alert> {
  const res = await fetch(`${BASE}/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? 'Failed to create alert')
  }
  return res.json()
}

export async function deleteAlert(id: string): Promise<void> {
  const res = await fetch(`${BASE}/alerts/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete alert')
}
