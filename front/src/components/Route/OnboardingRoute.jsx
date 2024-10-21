import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const OnboardingRoute = ({ children }) => {

    const { authState } = useContext(AuthContext);
    const { token, user, loading } = authState;

    if (loading) {
        return <Loader />;
    }

    if (!token) {
        return <Navigate to="/auth/iniciar-sesion" />;
    }

    if (user && user.onboardingComplete) {
        return <Navigate to="/inicio" />;
    }

    return children;
};

export default OnboardingRoute;
