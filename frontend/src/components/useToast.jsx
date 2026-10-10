// frontend/src/hooks/useToast.js
import { useState, useCallback } from 'react'

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, variant = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, variant }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return {
    toasts,
    removeToast,
    toast: {
      success: (msg) => addToast(msg, 'success'),
      error:   (msg) => addToast(msg, 'error'),
      info:    (msg) => addToast(msg, 'info'),
    }
  }
}