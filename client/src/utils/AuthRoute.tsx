import React from 'react'
import { useAppSelector } from '../hooks'
import { Outlet, Navigate } from 'react-router'

const AuthRoute = () => {
    const authReducer = useAppSelector((state) => state.authReducer)
    console.log(authReducer.token)
    return (
        !authReducer.token ? <Outlet /> : <Navigate to="/" />

    )
}

export default AuthRoute