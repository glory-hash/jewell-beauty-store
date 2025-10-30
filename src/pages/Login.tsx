import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/auth-impl'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const auth = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await auth.login(email, password)
      navigate('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
      <form onSubmit={handleSubmit} className="bg-white border p-6 rounded space-y-4">
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="Email" />
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="Mot de passe" />
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex items-center justify-between">
          <div>
            <a href="/forgot" className="text-sm text-yellow-600 underline">Mot de passe oublié ?</a>
          </div>
          <div>
            <button className="btn" type="submit">Connexion</button>
          </div>
        </div>
      </form>
    </main>
  )
}
