import { useEffect, useState, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { getUserRoleInProject } from '../../services/teamService';
import Loader from '../Loader/Loader';

const OrganizerRoute = ({ children }) => {

    const { id } = useParams(); // ID del proyecto

    const { authState } = useContext(AuthContext);
    const { token, user, loading } = authState;

    const [loadingRole, setLoadingRole] = useState(true);
    const [isOrganizer, setIsOrganizer] = useState(null);

    const checkUserRole = async () => {
        try {
            if (user && token && id) {
                const roleData = await getUserRoleInProject(id, user._id);

                // Verificamos si el rol es "Organizador"
                setIsOrganizer(roleData.role === 'Organizador');
            }
        } catch (error) {
            console.error('Error al verificar el rol del usuario:', error);
            setIsOrganizer(false);
        } finally {
            setLoadingRole(false);
        }
    };

    useEffect(() => {
        checkUserRole();
    }, [user, token, id]);

    if (loading || loadingRole) {
        return <Loader />;
    }

    if (!token) {
        return <Navigate to="/auth/iniciar-sesion" />;
    }

    if (user && !user.onboardingComplete) {
        return <Navigate to="/auth/onboarding" />;
    }

    if (isOrganizer === false) {
        return <Navigate to="/mis-proyectos" />;
    }

    return children;
};

export default OrganizerRoute;