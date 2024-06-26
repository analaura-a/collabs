import React from 'react'
import { createBrowserRouter } from "react-router-dom"

import MainLayout from '../layouts/MainLayout.jsx'
import Error404Page from '../pages/404Page/Error404Page.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import LoginPage from '../pages/LoginPage/LoginPage.jsx'
import SignupPage from '../pages/SignupPage/SignupPage.jsx'
import HomePage from '../pages/HomePage/HomePage.jsx'


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
                path: "/iniciar-sesion",
                element: <LoginPage />,
            },
            {
                path: "/crear-cuenta",
                element: <SignupPage />,
            },
            {
                path: "/inicio",
                element: <HomePage />,
            }
        ]
    }

])

export default AppRoutes;