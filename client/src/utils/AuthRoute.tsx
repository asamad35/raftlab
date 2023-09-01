import React from 'react'
import { useAppSelector } from '../hooks'
import { Outlet, Navigate } from 'react-router'

const AuthRoute = () => {
    const userReducer = useAppSelector((state) => state.userReducer)
    console.log(userReducer.token)
    return (
        !userReducer.token ? <Outlet /> : <Navigate to="/" />

    )
}

export default AuthRoute