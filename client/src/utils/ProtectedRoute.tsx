import React from 'react'
import { useAppSelector } from '../hooks'
import { Outlet, Navigate } from 'react-router'

const ProtectedRoute = () => {
    const authReducer = useAppSelector((state) => state.authReducer)

    return (
        authReducer.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute