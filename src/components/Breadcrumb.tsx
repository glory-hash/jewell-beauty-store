import { Link } from 'react-router-dom'

// Breadcrumb simple. Reçoit un tableau de {label, to}. En français
export default function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      {items.map((it, idx) => (
        <span key={idx} className="inline-flex items-center">
          {it.to ? <Link to={it.to} className="hover:underline">{it.label}</Link> : <span>{it.label}</span>}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  )
}
