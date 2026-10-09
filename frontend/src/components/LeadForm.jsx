// frontend/src/components/LeadForm.jsx
import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
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

  const inputClass = `w-full px-3 py-2 text-sm rounded-md
    bg-[#0f1011] border border-[#2a2b2f]
    text-[#f7f8f8] placeholder-[#62666d]
    focus:border-[#5e6ad2] focus:outline-none focus:ring-0
    transition-colors`

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#f7f8f8] tracking-tight mb-2">
          Nouveau message
        </h1>
        <p className="text-sm text-[#8a8f98]">
          Remplissez le formulaire ci-dessous. Un assistant IA préparera une réponse.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-[#8a8f98] mb-1.5 uppercase tracking-wide">
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
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8a8f98] mb-1.5 uppercase tracking-wide">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jean@exemple.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#8a8f98] mb-1.5 uppercase tracking-wide">
            Message
          </label>
          <textarea
            name="message"
            required
            minLength={5}
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Votre demande..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <div className="text-xs text-[#eb5757] border border-[#eb5757]/30
                          bg-[#eb5757]/5 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
                       bg-[#5e6ad2] hover:bg-[#6e79e0] text-white
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" strokeWidth={1.5} />
                Génération...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" strokeWidth={1.5} />
                Envoyer le message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}