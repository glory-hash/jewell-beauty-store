import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Composant de recherche produit. Redirige vers /catalog avec paramètre q.
export default function SearchBar() {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/catalog?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={submit} className="flex items-center">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher un produit..." className="p-2 border rounded-l" />
      <button type="submit" className="p-2 bg-gray-800 text-white rounded-r">Rechercher</button>
    </form>
  )
}
