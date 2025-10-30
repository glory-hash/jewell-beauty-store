// Page Contact contenant un formulaire simple
export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
      <form className="bg-white border p-6 rounded space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Votre nom" />
        <input className="w-full p-2 border rounded" placeholder="Email" />
        <textarea className="w-full p-2 border rounded" placeholder="Message" rows={6} />
        <div className="text-right">
          <button className="btn">Envoyer</button>
        </div>
      </form>
    </main>
  )
}
