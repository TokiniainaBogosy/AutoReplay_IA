// frontend/src/components/ResponseCard.jsx
export default function ResponseCard({ data, onReset }) {
  return (
    <div className="glass rounded-2xl p-8 shadow-2xl w-full max-w-xl animate-fade-in-up">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 
                        flex items-center justify-center text-white font-bold shadow-lg">
          ✓
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Réponse générée</h2>
          <p className="text-slate-400 text-sm">par notre assistant IA</p>
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 mb-4 border border-slate-700/50">
        <p className="text-xs text-slate-500 mb-1">Message original de {data.name}</p>
        <p className="text-slate-300 text-sm italic">"{data.message}"</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-950/50 to-purple-950/50 
                      rounded-xl p-5 border border-indigo-500/20 mb-6">
        <p className="text-xs text-indigo-300 font-medium mb-2">✉️ RÉPONSE IA</p>
        <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">
          {data.ai_reply}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <span>Statut : <span className="text-emerald-400 font-medium">{data.status}</span></span>
        <span>Lead #{data.id}</span>
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 rounded-lg font-medium text-slate-300
                   bg-slate-800/50 border border-slate-700
                   hover:bg-slate-700/50 hover:text-white
                   transition"
      >
        ← Nouveau message
      </button>
    </div>
  )
}