// frontend/src/App.jsx
// frontend/src/App.jsx
import { useState } from 'react'
import { FileText, LayoutDashboard } from 'lucide-react'
import LeadForm from './components/LeadForm'
import ResponseCard from './components/ResponseCard'
import Dashboard from './components/Dashboard'
import LoginModal from './components/LoginModal'
import ToastContainer from './components/ToastContainer'
import { useToast } from './hooks/useToast'
import { getApiKey } from './api'

export default function App() {
  const [response, setResponse] = useState(null)
  const [view, setView] = useState('public')
  const [showLogin, setShowLogin] = useState(false)
  const [isAuthed, setIsAuthed] = useState(!!getApiKey())
  const { toasts, removeToast, toast } = useToast()

  const handleAdminClick = () => {
    if (isAuthed) setView('admin')
    else setShowLogin(true)
  }

  const handleLoginSuccess = () => {
    setIsAuthed(true)
    setShowLogin(false)
    setView('admin')
    toast.success('Connexion réussie')
  }

  const handleLogout = () => {
    setIsAuthed(false)
    setView('public')
    toast.info('Déconnexion réussie')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#08090a]">
      {/* Header */}
      <header className="border-b border-[#1f2023]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => setView('public')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6]
                            group-hover:opacity-80 transition-opacity" />
            <span className="text-sm font-medium text-[#f7f8f8] tracking-tight">
              AutoReply
            </span>
            <span className="text-[10px] font-medium text-[#62666d] border border-[#2a2b2f]
                             rounded px-1.5 py-0.5 ml-1">
              BETA
            </span>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setView('public')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors
                ${view === 'public'
                  ? 'text-[#f7f8f8] bg-[#16171a]'
                  : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#16171a]'
                }`}
            >
              <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
              Formulaire
            </button>
            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors
                ${view === 'admin'
                  ? 'text-[#f7f8f8] bg-[#16171a]'
                  : 'text-[#8a8f98] hover:text-[#f7f8f8] hover:bg-[#16171a]'
                }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" strokeWidth={1.5} />
              Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {view === 'public' ? (
            response ? (
              <ResponseCard data={response} onReset={() => setResponse(null)} />
            ) : (
              <LeadForm onSuccess={(data) => {
                setResponse(data)
                toast.success('Réponse IA générée')
              }} />
            )
          ) : (
            <div className="max-w-5xl mx-auto">
              <Dashboard onLogout={handleLogout} toast={toast} />
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-[#1f2023] py-6">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-[#62666d]">
          <span>© 2026 AutoReply</span>
          <span>Propulsé par Groq</span>
        </div>
      </footer>

      {showLogin && (
        <LoginModal
          onLogin={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}