// frontend/src/components/Toast.jsx
import { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    color: 'text-[#4cb782]',
    border: 'border-[#4cb782]/30',
    bg: 'bg-[#4cb782]/10'
  },
  error: {
    icon: AlertCircle,
    color: 'text-[#eb5757]',
    border: 'border-[#eb5757]/30',
    bg: 'bg-[#eb5757]/10'
  },
  info: {
    icon: Info,
    color: 'text-[#5e6ad2]',
    border: 'border-[#5e6ad2]/30',
    bg: 'bg-[#5e6ad2]/10'
  }
}

export default function Toast({ message, variant = 'info', onClose, duration = 3500 }) {
  const config = VARIANTS[variant] || VARIANTS.info
  const Icon = config.icon

  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-lg
                     bg-[#0f1011] border ${config.border} 
                     shadow-2xl shadow-black/50 animate-fade-in
                     min-w-[280px] max-w-[400px]`}>
      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${config.color}`} strokeWidth={1.5} />
      <p className="flex-1 text-sm text-[#f7f8f8]">{message}</p>
      <button
        onClick={onClose}
        className="text-[#62666d] hover:text-[#f7f8f8] transition-colors"
      >
        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}