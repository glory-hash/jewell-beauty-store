import { createContext, useContext } from 'react'
import type { User } from '../types'

export type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  accessToken: string | null
  sessionExpiresAt: number | null
  isSessionExpiring: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, name: string) => Promise<string>
  verifyEmail: (token: string) => Promise<boolean>
  sendResetPassword: (email: string) => Promise<string>
  resetPassword: (token: string, newPassword: string) => Promise<boolean>
  extendSession: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  accessToken: null,
  sessionExpiresAt: null,
  isSessionExpiring: false,
  login: async () => {},
  logout: () => {},
  register: async () => '',
  verifyEmail: async () => false,
  sendResetPassword: async () => '',
  resetPassword: async () => false,
  extendSession: async () => false
})

export function useAuth() {
  return useContext(AuthContext)
}
