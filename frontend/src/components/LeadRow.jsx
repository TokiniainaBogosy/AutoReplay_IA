// frontend/src/components/LeadRow.jsx
import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { updateLeadStatus, deleteLead } from '../api'

export default function LeadRow({ lead, onUpdate, onDelete, toast }) {
  const [expanded, setExpanded] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    setBusy(true)
    try {
      await updateLeadStatus(lead.id, newStatus)
      onUpdate({ ...lead, status: newStatus })
      toast.success(`Statut mis à jour : ${newStatus}`)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Supprimer le lead de ${lead.name} ?`)) return
    setBusy(true)
    try {
      await deleteLead(lead.id)
      onDelete(lead.id)
      toast.success('Lead supprimé')
    } catch (err) {
      toast.error(err.message)
      setBusy(false)
    }
  }


  const date = new Date(lead.created_at).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className={`bg-[#0f1011] border border-[#1f2023] rounded-lg transition-opacity
                     ${busy ? 'opacity-50' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <p className="font-medium text-[#f7f8f8] text-sm truncate">
              {lead.name}
            </p>
            <StatusBadge status={lead.status} />
          </div>
          <p className="text-xs text-[#62666d] truncate">
            {lead.email} • {date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={lead.status}
            onChange={handleStatusChange}
            disabled={busy}
            className="px-2.5 py-1.5 text-xs rounded-md
                       bg-[#08090a] border border-[#2a2b2f]
                       text-[#c9cdd2] outline-none
                       focus:border-[#5e6ad2]
                       cursor-pointer transition-colors"
          >
            <option value="nouveau">Nouveau</option>
            <option value="repondu">Répondu</option>
            <option value="converti">Converti</option>
            <option value="archive">Archivé</option>
          </select>

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-md text-[#8a8f98] hover:text-[#f7f8f8]
                       hover:bg-[#16171a] transition-colors"
            title="Voir les détails"
          >
            {expanded
              ? <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
              : <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
            }
          </button>

          <button
            onClick={handleDelete}
            disabled={busy}
            className="p-1.5 rounded-md text-[#8a8f98] hover:text-[#eb5757]
                       hover:bg-[#eb5757]/10 transition-colors"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-2 border-t border-[#1f2023] space-y-3 animate-fade-in">
          <div>
            <p className="text-xs text-[#62666d] uppercase tracking-wide mb-1">
              Message du prospect
            </p>
            <p className="text-sm text-[#c9cdd2] italic">"{lead.message}"</p>
          </div>
          <div>
            <p className="text-xs text-[#5e6ad2] uppercase tracking-wide mb-1">
              Réponse IA
            </p>
            <p className="text-sm text-[#f7f8f8] leading-relaxed whitespace-pre-wrap">
              {lead.ai_reply}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}