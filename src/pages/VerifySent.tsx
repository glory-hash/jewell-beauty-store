import { useSearchParams, Link } from 'react-router-dom'

export default function VerifySent() {
  const [search] = useSearchParams()
  const token = search.get('token')
  const email = search.get('email')

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Vérification envoyée</h2>
      <p className="mb-4">Un email de vérification a été envoyé à <strong>{email}</strong> (simulation).</p>
      <div className="bg-white border p-4 rounded">
        <p className="mb-2">Cliquez sur le lien ci-dessous pour vérifier votre adresse :</p>
        <Link to={`/verify?token=${token}`} className="text-yellow-600 underline">Vérifier mon email</Link>
      </div>
    </main>
  )
}
