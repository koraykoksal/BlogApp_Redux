import React from 'react'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export const PrivateRouter = () => {

    const currentUser=true

  return currentUser ? <Outlet/> : <Navigate to='/login' replace/>
}
