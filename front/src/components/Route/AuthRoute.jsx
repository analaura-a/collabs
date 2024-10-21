import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Loader from '../Loader/Loader';

const AuthRoute = ({ children }) => {

    const { authState } = useContext(AuthContext);
    const { token, user, loading } = authState;

    if (loading) {
        return <Loader />;
    }

    if (token && user) {
        return <Navigate to="/inicio" />;
    }

    return children;

};

export default AuthRoute;
