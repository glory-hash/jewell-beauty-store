import { useState } from 'react'
import type { ReactNode } from 'react'

// Tooltip accessible et stylisé
// Ce composant fournit une aide contextuelle légère pour les contrôles.
// - Accessibilité : s'ouvre au hover et au focus (permet la navigation clavier)
// - Usage : <Tooltip content="..."> <button>...</button> </Tooltip>
// - position : 'top' | 'right' | 'bottom' | 'left'
interface TooltipProps {
  children: ReactNode
  content: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export default function Tooltip({ children, content, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  // Flèche du tooltip : on la positionne via CSS selon la position choisie
  // et on anime l'opacité + translation pour un rendu léger.
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {/* Tooltip box */}
      <div
        role="tooltip"
        aria-hidden={!visible}
        className={`pointer-events-none z-50 absolute whitespace-nowrap px-3 py-1 rounded-md text-sm text-white bg-gray-800 transition-all duration-150 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}` +
          (position === 'top' ? ' -bottom-10 left-1/2 -translate-x-1/2' : '') +
          (position === 'right' ? ' left-full top-1/2 -translate-y-1/2 ml-3' : '') +
          (position === 'bottom' ? ' top-full left-1/2 -translate-x-1/2 mt-3' : '') +
          (position === 'left' ? ' right-full top-1/2 -translate-y-1/2 mr-3' : '')
        }
      >
        {content}
        {/* Arrow */}
        <span
          className={`block w-2 h-2 bg-gray-800 rotate-45 absolute ${position === 'top' ? ' -bottom-1 left-1/2 -translate-x-1/2' : ''}` +
            (position === 'bottom' ? ' -top-1 left-1/2 -translate-x-1/2' : '') +
            (position === 'left' ? ' -right-1 top-1/2 -translate-y-1/2' : '') +
            (position === 'right' ? ' -left-1 top-1/2 -translate-y-1/2' : '')}
        />
      </div>
    </div>
  )
}