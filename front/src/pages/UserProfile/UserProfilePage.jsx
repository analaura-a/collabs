import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../services/userService";

const UserProfilePage = () => {

    const { username } = useParams();

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

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    if (error) {
        return <div>Error: {error}</div>; //Error
    }

    if (!user) {
        return <div>Usuario no encontrado</div>; //404
    }

    return (
        <section>
            Perfil de {user.name} {user.last_name}
        </section>
    )
}

export default UserProfilePage;