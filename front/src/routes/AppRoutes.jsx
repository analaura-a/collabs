import React from 'react'
import { createBrowserRouter } from "react-router-dom"

import MainLayout from '../layouts/MainLayout.jsx'
import AuthLayout from '../layouts/AuthLayout.jsx'
import Error404Page from '../pages/404Page/Error404Page.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import SignupPage from '../pages/SignupPage/SignupPage.jsx'
import ForgottenPasswordPage from '../pages/PasswordPage/ForgottenPasswordPage.jsx'
import ResetPasswordPage from '../pages/PasswordPage/ResetPasswordPage.jsx'
import OnboardingPage from '../pages/Onboarding/OnboardingPage.jsx'
import OnboardingCompletePage from '../pages/Onboarding/OnboardingCompletePage.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'

import ProtectedRoute from '../components/Route/ProtectedRoute.jsx'
import OnboardingRoute from '../components/Route/OnboardingRoute.jsx'
import AuthRoute from '../components/Route/AuthRoute.jsx'

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
                element: (<ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>),
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
                element: (<AuthRoute>
                    <LoginPage />
                </AuthRoute>),
            },
            {
                path: "/auth/crear-cuenta",
                element: (<AuthRoute>
                    <SignupPage />
                </AuthRoute>),
            },
            {
                path: "/auth/contraseña-olvidada",
                element: (<AuthRoute>
                    <ForgottenPasswordPage />
                </AuthRoute>),
            },
            {
                path: "/auth/restablecer-contraseña",
                element: (<AuthRoute>
                    <ResetPasswordPage />
                </AuthRoute>),
            },
            {
                path: "/auth/onboarding",
                element: (<OnboardingRoute>
                    <OnboardingPage />
                </OnboardingRoute>),
            },
            {
                path: "/auth/onboarding-completado",
                element: (<ProtectedRoute>
                    <OnboardingCompletePage />
                </ProtectedRoute>),
            }
        ]
    }

])

export default AppRoutes;