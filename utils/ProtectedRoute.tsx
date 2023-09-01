import React from 'react'
import { useAppSelector } from '../hooks'
import { Outlet, Navigate } from 'react-router'

const ProtectedRoute = () => {
    const userReducer = useAppSelector((state) => state.userReducer)

    return (
        userReducer.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoute