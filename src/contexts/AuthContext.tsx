import { useState, useEffect, useRef, type ReactNode } from 'react'
import type { User } from '../types'
import { AuthContext } from './auth-impl'

// Durées (simulation)
const ACCESS_TTL = 5 * 60 * 1000 // 5 minutes
const REFRESH_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days
const REFRESH_BEFORE = 30 * 1000 // tenter refresh 30s avant expiration
const WARNING_BEFORE = 60 * 1000 // avertir 60s avant expiration

export default function AuthProvider({ children }: { children: ReactNode }) {
  // utilisateur minimal exposé aux composants
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [loading, setLoading] = useState(false)
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    try {
      const raw = localStorage.getItem('auth')
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.accessToken || null
    } catch {
      return null
    }
  })

  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(() => {
    try {
      const raw = localStorage.getItem('auth')
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed.accessExpiresAt || null
    } catch {
      return null
    }
  })

  const [isSessionExpiring, setIsSessionExpiring] = useState(false)

  const refreshTimer = useRef<number | null>(null)
  const warningTimer = useRef<number | null>(null)

  // Helpers persistence (mock users + maps)
  type StoredUser = { id: string; email: string; name: string; password: string; verified: boolean }
  const readUsers = (): Array<StoredUser> => {
    try {
      const raw = localStorage.getItem('mock_users')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }
  const writeUsers = (u: Array<StoredUser>) => {
    try {
      localStorage.setItem('mock_users', JSON.stringify(u))
    } catch {
      // ignore
    }
  }

  const readMap = (key: string): Record<string, string> => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }
  const writeMap = (key: string, value: Record<string, string>) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore
    }
  }

  const makeToken = () => Math.random().toString(36).slice(2, 12)

  const clearTimers = () => {
    if (refreshTimer.current) {
      window.clearTimeout(refreshTimer.current)
      refreshTimer.current = null
    }
    if (warningTimer.current) {
      window.clearTimeout(warningTimer.current)
      warningTimer.current = null
    }
    setIsSessionExpiring(false)
  }

  const scheduleTimers = (expiresAt: number | null) => {
    clearTimers()
    if (!expiresAt) return
    const now = Date.now()
    const msToRefresh = expiresAt - now - REFRESH_BEFORE
    const msToWarning = expiresAt - now - WARNING_BEFORE

    if (msToWarning > 0) {
      warningTimer.current = window.setTimeout(() => {
        setIsSessionExpiring(true)
      }, msToWarning)
    } else {
      // already inside warning window
      setIsSessionExpiring(true)
    }

    if (msToRefresh > 0) {
      refreshTimer.current = window.setTimeout(async () => {
        await refreshTokens()
      }, msToRefresh)
    } else {
      // token already near expiry — refresh immediately
      void refreshTokens()
    }
  }

  type AuthRecord = {
    accessToken: string
    accessExpiresAt: number
    refreshToken: string
    refreshExpiresAt: number
    email: string
  }

  const persistAuth = (obj: AuthRecord | null) => {
    try {
      if (obj) {
        localStorage.setItem('auth', JSON.stringify(obj))
      } else {
        localStorage.removeItem('auth')
      }
    } catch {
      // ignore
    }
  }

  // Refresh implementation (simulé)
  const refreshTokens = async (): Promise<boolean> => {
    try {
      const raw = localStorage.getItem('auth')
      if (!raw) {
        logout()
        return false
      }
      const auth = JSON.parse(raw)
      const { refreshToken, refreshExpiresAt, email } = auth
      if (!refreshToken || !email) {
        logout()
        return false
      }
      const now = Date.now()
      if (refreshExpiresAt && refreshExpiresAt < now) {
        // refresh token expired
        logout()
        return false
      }

      // Simuler validation via map
      const map = readMap('mock_refresh')
      if (!map[refreshToken] || map[refreshToken] !== email) {
        logout()
        return false
      }

      // Générer nouveaux tokens (rotation)
      const newAccess = makeToken()
      const newRefresh = makeToken()
      const accessExpiresAt = Date.now() + ACCESS_TTL
      const refreshExpiresAtNew = Date.now() + REFRESH_TTL

      // Mettre à jour la map des refresh tokens (simulé côté serveur)
      delete map[refreshToken]
      map[newRefresh] = email
      writeMap('mock_refresh', map)

      const newAuth = {
        accessToken: newAccess,
        accessExpiresAt,
        refreshToken: newRefresh,
        refreshExpiresAt: refreshExpiresAtNew,
        email
      }
      persistAuth(newAuth)
      setAccessToken(newAccess)
      setSessionExpiresAt(accessExpiresAt)
      setIsSessionExpiring(false)
      scheduleTimers(accessExpiresAt)
      return true
    } catch {
      logout()
      return false
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const users = readUsers()
      // Recherche par email d'abord pour fournir des messages utiles
      const found = users.find((u) => u.email === email)
      if (!found) {
        // Message clair et action suggérée
        throw new Error("Email inconnu. Vérifiez l'adresse ou créez un compte.")
      }
      if (found.password !== password) {
        // Fournir une suggestion plutôt qu'un message générique
        throw new Error("Mot de passe incorrect. Vérifiez votre mot de passe ou utilisez 'Mot de passe oublié'.")
      }
      if (!found.verified) {
        throw new Error("Email non vérifié. Vérifiez votre messagerie pour le lien de validation.")
      }

      const u: User = { id: found.id, email: found.email, name: found.name }

      // Générer tokens et les persister
      const access = makeToken()
      const refresh = makeToken()
      const accessExpiresAt = Date.now() + ACCESS_TTL
      const refreshExpiresAt = Date.now() + REFRESH_TTL

      // Stocker map refresh -> email (simulé serveur)
      const map = readMap('mock_refresh')
      map[refresh] = email
      writeMap('mock_refresh', map)

      const authObj = {
        accessToken: access,
        accessExpiresAt,
        refreshToken: refresh,
        refreshExpiresAt,
        email
      }

      persistAuth(authObj)
      setUser(u)
      setAccessToken(access)
      setSessionExpiresAt(accessExpiresAt)
      setIsSessionExpiring(false)
      scheduleTimers(accessExpiresAt)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearTimers()
    setUser(null)
    setAccessToken(null)
    setSessionExpiresAt(null)
    persistAuth(null)
  }

  const register = async (email: string, password: string, name: string) => {
    const users = readUsers()
    if (users.find((u) => u.email === email)) {
      // Message utilisateur et action suggérée
      throw new Error("Email déjà utilisé. Essayez de vous connecter ou réinitialisez votre mot de passe.")
    }
    const id = Date.now().toString()
    const newUser = { id, email, name, password, verified: false }
    users.push(newUser)
    writeUsers(users)
    const token = makeToken()
    const map = readMap('mock_verifications')
    map[token] = email
    writeMap('mock_verifications', map)
    return token
  }

  const verifyEmail = async (token: string) => {
    const map = readMap('mock_verifications')
    const email = map[token]
    if (!email) return false
    const users = readUsers()
    const idx = users.findIndex((u) => u.email === email)
    if (idx === -1) return false
    users[idx].verified = true
    writeUsers(users)
    delete map[token]
    writeMap('mock_verifications', map)
    return true
  }

  const sendResetPassword = async (email: string) => {
    const users = readUsers()
    const found = users.find((u) => u.email === email)
    if (!found) throw new Error("Aucun compte trouvé pour cet email. Vérifiez l'adresse ou créez un compte.")
    const token = makeToken()
    const map = readMap('mock_resets')
    map[token] = email
    writeMap('mock_resets', map)
    return token
  }

  const resetPassword = async (token: string, newPassword: string) => {
    const map = readMap('mock_resets')
    const email = map[token]
    if (!email) return false
    const users = readUsers()
    const idx = users.findIndex((u) => u.email === email)
    if (idx === -1) return false
    users[idx].password = newPassword
    writeUsers(users)
    delete map[token]
    writeMap('mock_resets', map)
    return true
  }

  // Au montage, si un token est présent, restaurer et/ou tenter refresh
  useEffect(() => {
    const raw = localStorage.getItem('auth')
    if (!raw) return
    try {
      const auth = JSON.parse(raw)
      const { accessToken: at, accessExpiresAt, refreshToken, email } = auth
      const now = Date.now()
      if (!at || !accessExpiresAt) return
      if (accessExpiresAt > now) {
        // token encore valide
        setAccessToken(at)
        setSessionExpiresAt(accessExpiresAt)
        // restaurer user si possible
        const users = readUsers()
        const found = users.find((u) => u.email === email)
        if (found) setUser({ id: found.id, email: found.email, name: found.name })
        scheduleTimers(accessExpiresAt)
      } else if (refreshToken) {
        // essayer refresh
        void refreshTokens()
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Expose an explicit method to extend session (used by UI warning)
  const extendSession = async () => {
    return await refreshTokens()
  }

  const isAuthenticated = !!user && !!accessToken

  // Persister l'objet user séparément (pour affichage)
  useEffect(() => {
    try {
      if (user) localStorage.setItem('user', JSON.stringify(user))
      else localStorage.removeItem('user')
    } catch {
      // ignore
    }
  }, [user])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      accessToken,
      sessionExpiresAt,
      isSessionExpiring,
      login,
      logout,
      register,
      verifyEmail,
      sendResetPassword,
      resetPassword,
      extendSession
    }}>
      {children}
    </AuthContext.Provider>
  )
}
