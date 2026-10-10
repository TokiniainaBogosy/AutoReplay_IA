// frontend/src/utils/exportCsv.js
export function exportLeadsToCsv(leads) {
  if (leads.length === 0) return

  const headers = ['ID', 'Nom', 'Email', 'Message', 'Réponse IA', 'Statut', 'Date']
  
  const escape = (value) => {
    if (value == null) return ''
    const str = String(value).replace(/"/g, '""')
    return `"${str}"`
  }

  const rows = leads.map(lead => [
    lead.id,
    escape(lead.name),
    escape(lead.email),
    escape(lead.message),
    escape(lead.ai_reply),
    lead.status,
    new Date(lead.created_at).toLocaleString('fr-FR')
  ].join(','))

  // BOM UTF-8 pour Excel
  const BOM = '\uFEFF'
  const csv = BOM + [headers.join(','), ...rows].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const date = new Date().toISOString().split('T')[0]
  
  link.href = url
  link.download = `leads-autoreply-${date}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}