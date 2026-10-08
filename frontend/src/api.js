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