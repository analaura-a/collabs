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
import MyProfilePage from '../pages/UserProfile/MyProfilePage.jsx'
import UserProfilePage from '../pages/UserProfile/UserProfilePage.jsx'
import EditUserProfilePage from '../pages/EditUserProfile/EditUserProfilePage.jsx'
import ExploreProjectsPage from '../pages/ExplorePage/ExploreProjectsPage.jsx'
import ExploreUsersPage from '../pages/ExplorePage/ExploreUsersPage.jsx'
import ProjectDetailPage from '../pages/ProjectDetail/ProjectDetailPage.jsx'
import ProjectApplicationsPage from '../pages/ProjectRequests/ProjectApplicationsPage.jsx'
import MyProjectsPage from '../pages/MyProjects/MyProjectsPage.jsx'
import NewProjectPage from '../pages/CreateProject/NewProjectPage.jsx'
import CreatePersonalProjectPage from '../pages/CreateProject/CreatePersonalProjectPage.jsx'
import CreatOpenSourceProjectPage from '../pages/CreateProject/CreatOpenSourceProjectPage.jsx'

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
            },
            {
                path: "/mi-perfil",
                element: (<ProtectedRoute>
                    <MyProfilePage />
                </ProtectedRoute>),
            },
            {
                path: "/editar-perfil",
                element: (<ProtectedRoute>
                    <EditUserProfilePage />
                </ProtectedRoute>),
            },
            {
                path: "/explorar/proyectos",
                element: <ExploreProjectsPage />,
            },
            {
                path: "/proyectos/:id",
                element: (<ProtectedRoute>
                    <ProjectDetailPage />
                </ProtectedRoute>),
            },
            {
                path: "/explorar/colaboradores",
                element: <ExploreUsersPage />,
            },
            {
                path: "/colaboradores/:username",
                element: (<ProtectedRoute>
                    <UserProfilePage />
                </ProtectedRoute>),
            },
            {
                path: "/postulaciones",
                element: (<ProtectedRoute>
                    <ProjectApplicationsPage />
                </ProtectedRoute>),
            },
            {
                path: "/mis-proyectos",
                element: (<ProtectedRoute>
                    <MyProjectsPage />
                </ProtectedRoute>),
            },
            {
                path: "/nueva-convocatoria",
                element: (<ProtectedRoute>
                    <NewProjectPage />
                </ProtectedRoute>),
            },
            {
                path: "/nueva-convocatoria/personal",
                element: (<ProtectedRoute>
                    <CreatePersonalProjectPage />
                </ProtectedRoute>),
            },
            {
                path: "/nueva-convocatoria/open-source",
                element: (<ProtectedRoute>
                    <CreatOpenSourceProjectPage />
                </ProtectedRoute>),
            },
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