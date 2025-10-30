import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-impl'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const token = await auth.sendResetPassword(email)
      navigate(`/reset-sent?token=${token}&email=${encodeURIComponent(email)}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mot de passe oublié</h2>
      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded space-y-4">
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
        {error && <div className="text-red-600">{error}</div>}
        <div className="text-right">
          <button className="btn" type="submit">Envoyer le lien</button>
        </div>
      </form>
    </main>
  )
}
