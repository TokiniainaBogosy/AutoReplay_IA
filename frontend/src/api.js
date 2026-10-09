// frontend/src/api.js
const API_URL = '/api'  // redirigé vers http://127.0.0.1:8000 via proxy Vite

export async function generateReply({ name, email, message }) {
  const res = await fetch(`${API_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message })
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error.detail || 'Erreur lors de la génération')
  }

  return res.json()
}

// frontend/src/api.js

// ... generateReply existant ...

// --- Auth ---
export function saveApiKey(key) {
  localStorage.setItem('autoreply_api_key', key)
}

export function getApiKey() {
  return localStorage.getItem('autoreply_api_key')
}

export function clearApiKey() {
  localStorage.removeItem('autoreply_api_key')
}

// --- Routes admin (protégées) ---
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': getApiKey() || ''
  }
}

export async function fetchLeads() {
  const res = await fetch(`${API_URL}/leads`, { headers: authHeaders() })
  if (res.status === 401) throw new Error('UNAUTHORIZED')
  if (!res.ok) throw new Error('Erreur lors du chargement des leads')
  return res.json()
}

export async function updateLeadStatus(id, status) {
  const res = await fetch(`${API_URL}/leads/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status })
  })
  if (!res.ok) throw new Error('Erreur lors de la mise à jour')
  return res.json()
}

export async function deleteLead(id) {
  const res = await fetch(`${API_URL}/leads/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  if (!res.ok) throw new Error('Erreur lors de la suppression')
  return true
}