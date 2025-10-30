import { Fragment, type ReactNode, useEffect, useRef } from 'react'

// Composant Modal réutilisable
// Usage : envelopper un formulaire ou contenu interactif pour l'afficher
// en overlay. Le composant fournit un overlay cliquable pour fermer la modal
// et des boutons d'action standards (Annuler / Confirmer). Pour des cas
// plus avancés (focus-trap, accessibilité complète), envisage d'ajouter
// un utilitaire dédié ou d'utiliser une bibliothèque comme `react-aria`.
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, onConfirm, title, children }: ModalProps) {
  // Hooks must be called in the same order on every render.
  // On appelle les hooks ici de façon inconditionnelle, puis
  // on quitte tôt si la modal n'est pas ouverte.
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Gérer le focus trap et la fermeture au clavier (Escape)
  useEffect(() => {
    if (!isOpen) return
    const node = modalRef.current
    const previousActive = document.activeElement as HTMLElement | null

    // Sélecteur d'éléments focusables
    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

    const focusableElements = () => (node ? Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)) : [])

    // Focus initial sur le premier élément focusable sinon sur le conteneur
    const elems = focusableElements()
    if (elems.length) elems[0].focus()
    else node?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const elems = focusableElements()
        if (elems.length === 0) {
          e.preventDefault()
          return
        }
        const first = elems[0]
        const last = elems[elems.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // restaurer le focus sur l'élément actif précédent
      if (previousActive) previousActive.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Fragment>
      {/* Overlay : clic pour fermer */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Boîte de la modal
          - role=dialog et aria-modal pour accessibilité
          - tabIndex=-1 pour permettre le focus du conteneur si aucun élément
            focusable n'est présent
      */}
      <div ref={modalRef} role="dialog" aria-modal="true" tabIndex={-1}
           className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                    w-11/12 max-w-lg bg-white rounded-lg shadow-xl p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md
                     hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-600 text-white rounded-md
                     hover:bg-yellow-700 transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </Fragment>
  )
}