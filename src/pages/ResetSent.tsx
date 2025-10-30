import { useSearchParams, Link } from 'react-router-dom'

export default function ResetSent() {
  const [search] = useSearchParams()
  const token = search.get('token')
  const email = search.get('email')

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Réinitialisation envoyée</h2>
      <p className="mb-4">Un email contenant un lien de réinitialisation a été envoyé à <strong>{email}</strong> (simulation).</p>
      <div className="bg-white border p-4 rounded">
        <p className="mb-2">Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <Link to={`/reset-password?token=${token}`} className="text-yellow-600 underline">Réinitialiser mon mot de passe</Link>
      </div>
    </main>
  )
}
