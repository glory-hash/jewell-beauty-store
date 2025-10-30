import type { ReactNode } from 'react'
import { useAuth } from '../contexts/auth-impl'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) return <>{children}</>

  // Redirect to /login but preserve current location in state
  return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />
}
