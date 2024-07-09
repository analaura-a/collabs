import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AuthRoute = ({ children }) => {

    const { authState } = useContext(AuthContext);
    const { token, user, loading } = authState;

    if (loading) {
        return <div>Cargando...</div>; //Cambiar a componente de carga
    }

    if (token && user) {
        return <Navigate to="/inicio" />;
    }

    return children;

};

export default AuthRoute;
