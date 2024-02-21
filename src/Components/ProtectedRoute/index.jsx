import React from 'react'
import UseAuth from '../Contexts/Authantication'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticated} = UseAuth()
  return (
  

    <>
    {isAuthenticated ?  <>
        <Navigate to="/" />
        <Outlet/>
    </>:<Navigate to={"/login"}/>}

    </>
  )
}

export default ProtectedRoute