import React from 'react'
import { createBrowserRouter } from "react-router-dom"

import ScrollToTop from '../components/ScrollToTop/ScrollToTop.jsx'

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
import ProjectDashboardPage from '../pages/ProjectDashboard/ProjectDashboardPage.jsx'
import EditProjectDetailsPage from '../pages/ProjectDashboard/EditProjectDetailsPage.jsx'
import EditOpenPositionsPage from '../pages/ProjectDashboard/EditOpenPositionsPage.jsx'
import ReviewPage from '../pages/ProjectReviews/ReviewPage.jsx'
import MessagesPage from '../pages/Messages/MessagesPage.jsx'
import NotificationsPage from '../pages/Notifications/NotificationsPage.jsx'
import DonationPage from '../pages/DonationPage/DonationPage.jsx'

import ProtectedRoute from '../components/Route/ProtectedRoute.jsx'
import OnboardingRoute from '../components/Route/OnboardingRoute.jsx'
import AuthRoute from '../components/Route/AuthRoute.jsx'
import OrganizerRoute from '../components/Route/OrganizerRoute.jsx'

const AppRoutes = createBrowserRouter([

    {
        path: "/",
        element: (
            <>
                <ScrollToTop />
                <MainLayout />
            </>
        ),
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
                path: "/mis-proyectos/:id",
                element: (<ProtectedRoute>
                    <ProjectDashboardPage />
                </ProtectedRoute>),
            },
            {
                path: "/mis-proyectos/:id/editar-detalles",
                element: (<OrganizerRoute>
                    <EditProjectDetailsPage />
                </OrganizerRoute>),
            },
            {
                path: "/mis-proyectos/:id/editar-convocatoria",
                element: (<OrganizerRoute>
                    <EditOpenPositionsPage />
                </OrganizerRoute>),
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
            {
                path: "/mis-proyectos/:projectId/reseñar/:reviewedUserId",
                element: (<ProtectedRoute>
                    <ReviewPage />
                </ProtectedRoute>),
            },
            {
                path: "/mensajes",
                element: (<ProtectedRoute>
                    <MessagesPage />
                </ProtectedRoute>),
            },
            {
                path: "/notificaciones",
                element: (<ProtectedRoute>
                    <NotificationsPage />
                </ProtectedRoute>),
            },
            {
                path: "/donaciones",
                element: <DonationPage />,
            }
        ]
    },
    {
        path: "/auth",
        element: (
            <>
                <ScrollToTop />
                <AuthLayout />
            </>
        ),
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
                path: "/auth/restablecer-contraseña/:token",
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