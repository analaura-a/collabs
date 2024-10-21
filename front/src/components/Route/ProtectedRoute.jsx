import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const ProtectedRoute = ({ children }) => {

    const { authState } = useContext(AuthContext);
    const { token, user, loading } = authState;

    if (loading) {
        return <Loader />;
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