// Bannières promotionnelles affichées en haut des pages
export default function PromoBanner({ message }: { message?: string }) {
  return (
    <div className="w-full bg-amber-100 text-amber-800 py-2 text-center text-sm">
      {message ?? "Livraison offerte dès 100 000 FCFA — Code : JEWEL10"}
    </div>
  )
}
