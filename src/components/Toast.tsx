import { useEffect } from 'react'

// Toast : notification temporaire
// - Usage : fournir `message`, `type` (success|error|info) et `onDismiss`
// - Le composant se ferme automatiquement après `duration` ms
// - Style discret pour s'intégrer au thème ; peut être remplacé par
//   un gestionnaire global si nécessaire.
interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info'
  onDismiss: () => void
  duration?: number
}

export default function Toast({ 
  message, 
  type = 'success', 
  onDismiss,
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type]

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg
                    shadow-lg animate-slide-up z-50 flex items-center gap-2`}>
      {type === 'success' && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
      {message}
    </div>
  )
}