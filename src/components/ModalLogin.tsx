import { useState } from 'react'

// Modal simple de connexion/utilisateur. Pour la demo, il n'effectue pas d'auth réelle.
export default function ModalLogin({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Connexion</h3>
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-4" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1">Annuler</button>
          <button onClick={() => { /* TODO: appeler API d'auth */ onClose() }} className="btn">Se connecter</button>
        </div>
      </div>
    </div>
  )
}
