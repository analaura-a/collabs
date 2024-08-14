import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../services/userService";

const UserProfilePage = () => {

    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('*');
        }
    }, [loading, user, navigate]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    if (error) {
        return <div>Error: {error}</div>; //Error
    }

    return (
        <section>
            Perfil de {user.name} {user.last_name}
        </section>
    )
}

export default UserProfilePage;