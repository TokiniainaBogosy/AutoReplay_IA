// frontend/src/components/NotFound.jsx
import { FileQuestion } from 'lucide-react'

export default function NotFound({ onBack }) {
  return (
    <div className="text-center py-20 animate-fade-in">
      <FileQuestion className="w-10 h-10 mx-auto mb-4 text-[#62666d]" strokeWidth={1.5} />
      <h1 className="text-lg font-medium text-[#f7f8f8] mb-1">Page introuvable</h1>
      <p className="text-sm text-[#8a8f98] mb-6">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <button
        onClick={onBack}
        className="px-4 py-2 text-sm rounded-md text-[#8a8f98]
                   hover:text-[#f7f8f8] border border-[#2a2b2f]
                   hover:border-[#3a3b3f] transition-colors"
      >
        Retour à l'accueil
      </button>
    </div>
  )
}