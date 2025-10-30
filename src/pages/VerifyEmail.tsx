import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/auth-impl'

export default function VerifyEmail() {
  const [search] = useSearchParams()
  const token = search.get('token') || ''
  const auth = useAuth()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleVerify = async () => {
    try {
      const ok = await auth.verifyEmail(token)
      setStatus(ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Vérification</h2>
      {status === 'idle' && (
        <div>
          <p className="mb-4">Cliquez pour confirmer votre adresse email.</p>
          <button onClick={handleVerify} className="btn">Vérifier mon email</button>
        </div>
      )}
      {status === 'success' && <div className="text-green-600">Email vérifié. Vous pouvez maintenant vous connecter.</div>}
      {status === 'error' && <div className="text-red-600">Le lien est invalide ou expiré.</div>}
    </main>
  )
}
