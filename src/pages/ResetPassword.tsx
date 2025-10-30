import { useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/auth-impl'

export default function ResetPassword() {
  const [search] = useSearchParams()
  const token = search.get('token') || ''
  const auth = useAuth()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const ok = await auth.resetPassword(token, password)
      setStatus(ok ? 'success' : 'error')
      if (ok) setTimeout(() => navigate('/login'), 1500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h2>
      {status === 'idle' && (
        <form onSubmit={handleSubmit} className="bg-white border p-6 rounded space-y-4">
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Nouveau mot de passe" />
          <div className="text-right">
            <button className="btn" type="submit">Réinitialiser</button>
          </div>
        </form>
      )}
      {status === 'success' && <div className="text-green-600">Mot de passe mis à jour. Redirection vers la connexion...</div>}
      {status === 'error' && <div className="text-red-600">Lien invalide ou expiré.</div>}
    </main>
  )
}
