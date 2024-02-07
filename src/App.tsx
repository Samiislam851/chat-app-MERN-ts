import React, { useContext } from 'react'
import { Context } from './Configs/ContextProvider'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RestrictedPublicRoute from './Configs/RestrictedPublicRoute'
import Dashboard from './pages/Dashboard/Dashboard'
import DefaultHome from './components/DefaultHome/DefaultHome'
import Chat from './components/Chat/Chat'
import PrivateRoute from './Configs/PrivateRoute'
type Props = {}

const App = (props: Props) => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/dashboard' />,
      errorElement: <>404 page</>,

    },
    {
      path: '/dashboard/',
      element: <PrivateRoute> <Dashboard /></PrivateRoute> ,
      errorElement: <>404 page</>,
      children: [
        {
          path:'/dashboard/',
          element: <DefaultHome/>
        },
        {
          path:'/dashboard/chat',
          element: <Chat/>
        },
      ]
    },
    {
      path: '/login',
      element: <RestrictedPublicRoute><Login /></RestrictedPublicRoute>,
      errorElement: <>404 page</>
    },
    {
      path: '/register',
      element: <RestrictedPublicRoute><Register /></RestrictedPublicRoute>,
      errorElement: <>404 page</>
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App