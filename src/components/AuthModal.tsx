import { useState, useEffect, useRef } from 'react'
import Modal from './Modal'
import { useAuth } from '../contexts/auth-impl'
import { useNavigate, useLocation } from 'react-router-dom'

// Composant AuthModal amélioré
// - fournis plusieurs vues (login / signup / forgot)
// - validations en temps réel avec feedback discret
// - garde le contexte de la page (modal overlay)
// - onSuccess permet de préserver le comportement post-login (redirection)
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
  onSuccess?: () => void
}

type Mode = 'login' | 'signup' | 'forgot'

export default function AuthModal({ isOpen, onClose, message, onSuccess }: AuthModalProps) {
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Mode courant du modal (login / signup / forgot password)
  const [mode, setMode] = useState<Mode>('login')

  // Champs communs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // UI state
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  // Timer pour autohide des messages d'erreur après correction
  const dismissTimer = useRef<number | null>(null)

  // Validation en temps réel
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const passwordValid = password.length >= 8

  useEffect(() => {
    if (!isOpen) {
      // reset fields when modal closes to preserve a clean state
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setError(null)
      setSuccess(null)
      setSubmitting(false)
      setMode('login')
    }
    return () => {
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current)
    }
  }, [isOpen])

  // Gérer redirection preservée (si la navigation vers login a été forcée)
  const maybeNavigateBack = () => {
    const state = (location.state && (location.state as { from?: string })) || {}
    if (state.from) navigate(state.from, { replace: true })
  }

  const handleSubmit = async () => {
    setError(null)
    setSuccess(null)
    setSubmitting(true)
    try {
      if (mode === 'login') {
        if (!emailValid) throw new Error('Email invalide')
        if (!passwordValid) throw new Error('Mot de passe trop court (8 caractères minimum)')
        await auth.login(email, password)
        setSuccess('Connexion réussie')
        onClose()
        if (onSuccess) onSuccess()
        maybeNavigateBack()
      } else if (mode === 'signup') {
        if (!emailValid) throw new Error('Email invalide')
        if (!passwordValid) throw new Error('Mot de passe trop court (8 caractères minimum)')
        if (!firstName) throw new Error('Merci de saisir votre prénom')
        // register retourne un token de vérification (simulation)
        const token = await auth.register(email, password, `${firstName} ${lastName}`)
        setSuccess('Compte créé — vérifiez votre courrier pour valider votre email')
        // afficher token discrètement en dev (ou le copier dans un overlay dev)
        console.info('verification-token', token)
      } else if (mode === 'forgot') {
        if (!emailValid) throw new Error('Email invalide')
        const token = await auth.sendResetPassword(email)
        setSuccess('Un lien de réinitialisation a été envoyé (simulation)')
        console.info('reset-token', token)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  // Effet : si une erreur est présente mais l'utilisateur corrige les champs
  // (email/password deviennent valides), masquer automatiquement le message
  useEffect(() => {
    if (!error) return
    if (email && password) {
      if (emailValid && passwordValid) {
        // délai court avant autohide pour laisser le temps à l'utilisateur
        if (dismissTimer.current) window.clearTimeout(dismissTimer.current)
        dismissTimer.current = window.setTimeout(() => {
          setError(null)
        }, 1400)
      }
    } else if (email && !password && emailValid) {
      // si seulement email corrigé
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current)
      dismissTimer.current = window.setTimeout(() => setError(null), 1200)
    }
    return () => {
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current)
    }
  }, [email, password, emailValid, passwordValid, error])

  // Contenu dynamique selon le mode
  const title = mode === 'login' ? 'Connexion' : mode === 'signup' ? 'Créer un compte' : 'Mot de passe oublié'
  const confirmLabel = mode === 'login' ? 'Se connecter' : mode === 'signup' ? 'S’inscrire' : 'Envoyer le lien'

  return (
    // Appliquer un styling cohérent avec le positionnement haut de gamme :
    // - fond crème doux, accents or pour les actions principales
    // - typographie claire et espacements généreux
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleSubmit} title={title}>
      <div className="space-y-4 bg-luxury-cream-light p-4 rounded-md">
        {/* message contextuel optionnel */}
        {message && <div className="text-gray-700">{message}</div>}

        {/* Petite explication élégante : pourquoi se connecter */}
        <div className="p-3 border border-luxury-gold/20 bg-luxury-cream text-sm rounded text-luxury-black">
          <strong className="block text-sm mb-1">Pourquoi se connecter ?</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sécurité renforcée lors du paiement</li>
            <li>Votre panier est sauvegardé pour retrouver vos articles</li>
            <li>Historique de commandes et recommandations personnalisées</li>
          </ul>
        </div>

        {mode === 'signup' && (
          <div className="grid grid-cols-2 gap-2">
            <input value={firstName} onChange={e => { setFirstName(e.target.value); setError(null); setSuccess(null) }} placeholder="Prénom" className="p-2 border rounded" />
            <input value={lastName} onChange={e => { setLastName(e.target.value); setError(null); setSuccess(null) }} placeholder="Nom" className="p-2 border rounded" />
          </div>
        )}

        <div>
          <input
            value={email}
            onChange={e => { setEmail(e.target.value); setError(null); setSuccess(null) }}
            className={`w-full p-3 border rounded placeholder-gray-400 transition-colors ${email && !emailValid ? 'border-red-300' : 'border-luxury-gold/30 bg-white'}`}
            placeholder="Email"
            autoFocus
          />
          {/* feedback discret */}
          {email && !emailValid && <div className="text-xs text-red-600 mt-1">Adresse email invalide</div>}
        </div>

        {mode !== 'forgot' && (
          <div>
            <input
              value={password}
              onChange={e => { setPassword(e.target.value); setError(null); setSuccess(null) }}
              type="password"
              className={`w-full p-3 border rounded placeholder-gray-400 transition-colors ${password && !passwordValid ? 'border-red-300' : 'border-luxury-gold/30 bg-white'}`}
              placeholder="Mot de passe"
            />
            {password && !passwordValid && <div className="text-xs text-red-600 mt-1">Minimum 8 caractères</div>}
          </div>
        )}

        {/* messages */}
    {/* Affichage des messages d'erreur / succès
      - Erreurs : rouge discret avec fond léger pour s'intégrer au thème
      - Messages de succès : vert doux
      Les erreurs sont masquées automatiquement lorsque l'utilisateur
      corrige les champs (auto-dismiss). */}
    {error && <div className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded">{error}</div>}
    {success && <div className="text-sm text-green-700">{success}</div>}

        {/* Liens subtils */}
  <div className="flex items-center justify-between text-sm">
          {mode !== 'forgot' ? (
            <button type="button" className="text-yellow-700 underline" onClick={() => setMode('forgot')}>Mot de passe oublié ?</button>
          ) : (
            <button type="button" className="text-gray-600 underline" onClick={() => setMode('login')}>Retour</button>
          )}
          <div>
            {mode === 'signup' ? (
              <button type="button" className="text-luxury-black underline" onClick={() => setMode('login')}>J’ai déjà un compte</button>
            ) : (
              <button type="button" className="text-luxury-black underline" onClick={() => setMode('signup')}>Créer un compte</button>
            )}
          </div>
        </div>

        {/* Indicateur de progression */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 bg-luxury-gold text-luxury-cream rounded-md hover:brightness-95 disabled:opacity-60"
          >
            {submitting ? '...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
