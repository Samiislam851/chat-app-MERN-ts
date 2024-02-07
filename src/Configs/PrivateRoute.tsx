import React, { ReactNode, useContext } from 'react'
import { Context } from './ContextProvider'
import { Navigate } from 'react-router-dom'

type Props = {
    children: ReactNode
}


const PrivateRoute = ({ children }: Props) => {

    const { user,loading } = useContext(Context)!
if (!loading) {
    return (
        <> {!user ? <Navigate to='/login' /> : <>{children}</>}</>
    ) 
}
return <> <div className='text-4xl animate-spin'>C</div></>
    
}

export default PrivateRoute