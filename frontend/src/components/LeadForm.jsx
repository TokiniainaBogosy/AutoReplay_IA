// frontend/src/components/LeadForm.jsx
import { useState } from 'react'
import { generateReply } from '../api'

export default function LeadForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await generateReply(form)
      onSuccess(data)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 shadow-2xl w-full max-w-xl">
      <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
        Contactez-nous
      </h2>
      <p className="text-slate-400 text-sm mb-6">
        Un assistant IA vous répondra instantanément.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Nom complet
          </label>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            value={form.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 
                       outline-none transition text-slate-100 placeholder-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jean@example.com"
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 
                       outline-none transition text-slate-100 placeholder-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Votre message
          </label>
          <textarea
            name="message"
            required
            minLength={5}
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Bonjour, je suis intéressé par vos services..."
            className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 
                       outline-none transition text-slate-100 placeholder-slate-500 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 
                          px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-500 hover:to-purple-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 shadow-lg shadow-indigo-500/25
                     hover:shadow-indigo-500/40"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Génération en cours...
            </span>
          ) : (
            '🚀 Envoyer et générer une réponse IA'
          )}
        </button>
      </div>
    </form>
  )
}