import { FC, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { getRoutePathByName } from 'lib/routes/helpers'
import { useAuth } from 'lib/auth/AuthContext'

const GuestGuard: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth()

  return auth?.user ? <Navigate to={getRoutePathByName('home')} replace /> : children
}

export default GuestGuard
