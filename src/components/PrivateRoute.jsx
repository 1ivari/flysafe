import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <button className='btn loading'>loading</button>
  }

  return loggedIn ? <Outlet /> : <Navigate to='/signin' />
}

export default PrivateRoute
