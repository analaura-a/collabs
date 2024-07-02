import React from 'react'
import { createBrowserRouter } from "react-router-dom"

import MainLayout from '../layouts/MainLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Error404Page from '../pages/404Page/Error404Page.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import SignupPage from '../pages/SignupPage/SignupPage.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'
import ForgottenPasswordPage from '../pages/PasswordPage/ForgottenPasswordPage.jsx'
import ResetPasswordPage from '../pages/PasswordPage/ResetPasswordPage.jsx'


const AppRoutes = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/inicio",
                element: <HomePage />,
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        errorElement: <Error404Page />,
        children: [
            {
                path: "/auth/iniciar-sesion",
                element: <LoginPage />,
            },
            {
                path: "/auth/crear-cuenta",
                element: <SignupPage />,
            },
            {
                path: "/auth/contraseña-olvidada",
                element: <ForgottenPasswordPage />,
            },
            {
                path: "/auth/reestablecer-contraseña",
                element: <ResetPasswordPage />,
            }
        ]
    }

])

export default AppRoutes;