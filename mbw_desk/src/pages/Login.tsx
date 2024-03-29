import React from 'react'
import LoginView from '../sections/Login/view'
import { Helmet } from 'react-helmet-async'

function Login() {
    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <LoginView/>
        </>
    )
}

export default Login
