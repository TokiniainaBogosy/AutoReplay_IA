// frontend/src/components/ResponseCard.jsx
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function ResponseCard({ data, onReset }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#f7f8f8] tracking-tight mb-2">
          Réponse générée
        </h1>
        <p className="text-sm text-[#8a8f98]">
          Lead #{data.id} • Statut : {data.status}
        </p>
      </div>

      <div className="mb-6 pb-6 border-b border-[#1f2023]">
        <p className="text-xs font-medium text-[#8a8f98] uppercase tracking-wide mb-2">
          Message de {data.name}
        </p>
        <p className="text-sm text-[#c9cdd2] italic">
          "{data.message}"
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#5e6ad2]" strokeWidth={1.5} />
          <p className="text-xs font-medium text-[#5e6ad2] uppercase tracking-wide">
            Réponse IA
          </p>
        </div>
        <div className="text-sm text-[#f7f8f8] leading-relaxed whitespace-pre-wrap">
          {data.ai_reply}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
                     text-[#8a8f98] hover:text-[#f7f8f8]
                     border border-[#2a2b2f] hover:border-[#3a3b3f]
                     transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
          Nouveau message
        </button>
      </div>
    </div>
  )
}