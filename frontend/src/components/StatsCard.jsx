// frontend/src/components/StatsCards.jsx
import { Inbox, Circle, MessageCircle, CheckCircle2 } from 'lucide-react'

export default function StatsCards({ leads }) {
  const stats = {
    total: leads.length,
    nouveau: leads.filter(l => l.status === 'nouveau').length,
    repondu: leads.filter(l => l.status === 'repondu').length,
    converti: leads.filter(l => l.status === 'converti').length,
  }

  const cards = [
    { label: 'Total',     value: stats.total,    icon: Inbox,        color: '#f7f8f8' },
    { label: 'Nouveaux',  value: stats.nouveau,  icon: Circle,       color: '#5e6ad2' },
    { label: 'Répondus',  value: stats.repondu,  icon: MessageCircle, color: '#f2c94c' },
    { label: 'Convertis', value: stats.converti, icon: CheckCircle2, color: '#4cb782' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div key={c.label}
               className="bg-[#0f1011] border border-[#1f2023] rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-3 text-[#8a8f98]">
              <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
              <p className="text-xs">{c.label}</p>
            </div>
            <p className="text-2xl font-semibold tracking-tight"
               style={{ color: c.color }}>
              {c.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}