// frontend/src/App.jsx
import { useState } from 'react'
import LeadForm from './components/LeadForm'
import ResponseCard from './components/ResponseCard'

export default function App() {
  const [response, setResponse] = useState(null)

  return (
    <div className="gradient-bg min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                        glass text-xs font-medium text-indigo-300 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Propulsé par l'IA
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r 
                       from-white via-indigo-200 to-purple-300 
                       bg-clip-text text-transparent mb-3">
          AutoReply AI
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Automatisez vos réponses clients avec l'intelligence artificielle générative.
        </p>
      </header>

      {/* Contenu principal */}
      <main className="w-full flex justify-center">
        {response ? (
          <ResponseCard data={response} onReset={() => setResponse(null)} />
        ) : (
          <LeadForm onSuccess={setResponse} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 text-slate-600 text-sm">
        © 2026 AutoReply AI — Projet portfolio
      </footer>
    </div>
  )
}