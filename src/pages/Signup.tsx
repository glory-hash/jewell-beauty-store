import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-impl'

export default function Signup() {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const token = await auth.register(email, password, `${first} ${last}`)
      // Simuler envoi email en redirigeant vers une page qui montre le lien
      navigate(`/verify-sent?token=${token}&email=${encodeURIComponent(email)}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message || 'Erreur')
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input required value={first} onChange={e => setFirst(e.target.value)} className="p-2 border rounded" placeholder="Prénom" />
          <input required value={last} onChange={e => setLast(e.target.value)} className="p-2 border rounded" placeholder="Nom" />
        </div>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Mot de passe" />
        {error && <div className="text-red-600">{error}</div>}
        <div className="text-right">
          <button className="btn" type="submit">S'inscrire</button>
        </div>
      </form>
    </main>
  )
}
