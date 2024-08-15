import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const EditUserProfilePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    if (!user) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>Editar perfil</main>
    )
}

export default EditUserProfilePage;