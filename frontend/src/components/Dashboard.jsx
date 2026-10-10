// frontend/src/components/Dashboard.jsx
import { useEffect, useState } from 'react'
import { fetchLeads, clearApiKey } from '../api'
import StatsCards from './StatsCard'
import LeadRow from './LeadRow'
import { RefreshCw, LogOut, Search, Trash2, ChevronDown, ChevronUp,Download } from 'lucide-react'
import { Inbox } from 'lucide-react'
import { exportLeadsToCsv } from '../utils/exportCsv'
import { useDebounce } from '../hooks/useDebounce'


const FILTERS = [
  { key: 'all',      label: 'Tous' },
  { key: 'nouveau',  label: '🆕 Nouveaux' },
  { key: 'repondu',  label: '💬 Répondus' },
  { key: 'converti', label: '✅ Convertis' },
  { key: 'archive',  label: '📦 Archivés' },
]

export default function Dashboard({ onLogout,toast }) {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const handleExport = () => {
    if (filteredLeads.length === 0) {
      toast.info('Aucun lead à exporter')
      return
    }
    exportLeadsToCsv(filteredLeads)
    toast.success(`${filteredLeads.length} lead(s) exporté(s)`)
  }

  const loadLeads = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchLeads()
      setLeads(data)
    } catch (err) {
      if (err.message === 'UNAUTHORIZED') {
        onLogout()
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadLeads() }, [])

  const handleUpdate = (updated) => {
    setLeads(leads.map(l => l.id === updated.id ? updated : l))
  }

  const handleDelete = (id) => {
    setLeads(leads.filter(l => l.id !== id))
  }

  const filteredLeads = leads
  .filter(l => filter === 'all' || l.status === filter)
  .filter(l => {
    if (!debouncedSearch) return true
    const s = debouncedSearch.toLowerCase()
    return l.name.toLowerCase().includes(s)
        || l.email.toLowerCase().includes(s)
        || l.message.toLowerCase().includes(s)
  })

  useEffect(() => {
  const interval = setInterval(() => {
      // silencieux : pas de setLoading(true)
      fetchLeads()
        .then(setLeads)
        .catch(err => {
          if (err.message === 'UNAUTHORIZED') onLogout()
        })
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400 text-sm">Gestion des leads</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#62666d]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cb782] animate-pulse" />
          Live
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadLeads}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md
                      text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#16171a]
                      transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span className="hidden sm:inline">Rafraîchir</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md
                      text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#16171a]
                      transition-colors"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            Export CSV
          </button>

          <button
            onClick={() => { clearApiKey(); onLogout() }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md
                      text-[#8a8f98] hover:text-[#eb5757] hover:bg-[#eb5757]/10
                      transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
            Déconnexion
          </button>

        </div>
      </div>

      {/* Stats */}
      <StatsCards leads={leads} />

      {/* Barre de recherche + filtres */}
      <div className="glass rounded-xl p-4 mb-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 
                            text-[#62666d] pointer-events-none" strokeWidth={1.5} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md
                      bg-[#0f1011] border border-[#2a2b2f]
                      text-[#f7f8f8] placeholder-[#62666d]
                      focus:border-[#5e6ad2] focus:outline-none transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors
              ${filter === f.key
                ? 'bg-[#16171a] text-[#f7f8f8] border border-[#2a2b2f]'
                : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#16171a]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      {loading && (
        <div className="text-center py-12 text-slate-400">Chargement...</div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300 
                        px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && filteredLeads.length === 0 && (
        <div className="bg-[#0f1011] border border-[#1f2023] rounded-lg p-12 text-center">
          <Inbox className="w-8 h-8 mx-auto mb-3 text-[#62666d]" strokeWidth={1.5} />
          <p className="text-sm text-[#8a8f98]">
            {leads.length === 0
              ? 'Aucun lead pour le moment'
              : 'Aucun lead ne correspond à vos critères'}
          </p>
        </div>
      )}

      {!loading && filteredLeads.length > 0 && (
        <div className="space-y-3">
          {filteredLeads.map(lead => (
            <LeadRow
              key={lead.id}
              lead={lead}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              toast={toast}
            />
          ))}
        </div>
      )}
    </div>
  )
}