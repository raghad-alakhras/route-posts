import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

export default function ProtectRoute({children}) {
  const { isLogin } = useContext(authContext)
  
 if(isLogin || localStorage.getItem('token'))
    return children
  else 
    return <Navigate to={'/login'}/>
}
