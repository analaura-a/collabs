import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {

    const { authState } = useContext(AuthContext);

    const { token, user, loading } = authState;

    if (loading) {
        return <div>Cargando...</div>; //Cambiar a componente de carga
    }

    if (!token) {
        return <Navigate to="/auth/iniciar-sesion" />;
    }

    if (user && !user.onboardingComplete) {
        return <Navigate to="/auth/onboarding" />;
    }

    return children;

};

export default ProtectedRoute;