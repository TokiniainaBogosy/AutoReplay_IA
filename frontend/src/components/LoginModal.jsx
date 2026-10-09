// frontend/src/components/LoginModal.jsx
import { useState } from 'react'
import { KeyRound } from 'lucide-react'
import { saveApiKey, fetchLeads } from '../api'

export default function LoginModal({ onLogin, onClose }) {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      saveApiKey(key)
      await fetchLeads()
      onLogin()
    } catch (err) {
      setError('Clé API invalide')
      saveApiKey('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
         onClick={onClose}>
      <div
        className="w-full max-w-sm bg-[#0f1011] border border-[#2a2b2f] rounded-lg
                   shadow-2xl shadow-black/50 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-1">
          <KeyRound className="w-4 h-4 text-[#8a8f98]" strokeWidth={1.5} />
          <h2 className="text-base font-medium text-[#f7f8f8]">
            Accès administrateur
          </h2>
        </div>
        <p className="text-xs text-[#8a8f98] mb-5">
          Entrez votre clé API pour continuer
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="sk-..."
            required
            autoFocus
            className="w-full px-3 py-2 text-sm rounded-md font-mono
                       bg-[#08090a] border border-[#2a2b2f]
                       text-[#f7f8f8] placeholder-[#62666d]
                       focus:border-[#5e6ad2] focus:outline-none
                       transition-colors"
          />

          {error && (
            <p className="text-xs text-[#eb5757]">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm rounded-md
                         text-[#8a8f98] hover:text-[#f7f8f8]
                         border border-[#2a2b2f] hover:border-[#3a3b3f]
                         transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 text-sm font-medium rounded-md
                         bg-[#5e6ad2] hover:bg-[#6e79e0] text-white
                         disabled:opacity-50 transition-colors"
            >
              {loading ? '...' : 'Continuer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}