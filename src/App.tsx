import React, { useContext } from 'react'
import { Context } from './providers/ContextProvider'
import Login from './pages/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
type Props = {}

const App = (props: Props) => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>hello</>,
      errorElement: <>404 page</>
    },
    {
      path: '/login',
      element: <Login/>,
      errorElement: <>404 page</>
    },
    {
      path: '/register',
      element:<>Reg</>,
      errorElement: <>404 page</>
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App