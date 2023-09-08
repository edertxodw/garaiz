import { Attributes, Suspense, lazy } from 'react'
import { Navigate, NonIndexRouteObject } from 'react-router-dom'
import AuthRoute from 'lib/middlewares/AuthRoute'
import GuestGuard from 'lib/middlewares/GuestRoute'
import Loader from 'components/common/styled/Loader'

interface AppRouteObject extends NonIndexRouteObject {
  name: string
}

const Loadable = (Component: any) => (props: Attributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )

const Home = Loadable(lazy(() => import('pages/Home')))
const Login = Loadable(lazy(() => import('pages/Login')))
const Chat = Loadable(lazy(() => import('pages/Chat')))

const AppRoutes: AppRouteObject[] = [
  { path: '/', element: <Home />, name: 'home' },
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
    name: 'login',
  },
  {
    path: '/chat',
    element: (
      <AuthRoute>
        <Chat />
      </AuthRoute>
    ),
    name: 'chat',
  },
  { path: '*', element: <Navigate to="/" />, name: 'default' },
]

export default AppRoutes
