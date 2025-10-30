import { useAuth } from '../contexts/auth-impl'

export default function Profile() {
  const { user } = useAuth()
  if (!user) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Mon profil</h2>
        <div className="text-gray-600">Vous devez être connecté pour voir cette page.</div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mon profil</h2>
      <div className="bg-white border p-6 rounded space-y-4">
        <div>
          <div className="text-sm text-gray-500">Nom</div>
          <div className="font-medium">{user.name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>
      </div>
    </main>
  )
}
