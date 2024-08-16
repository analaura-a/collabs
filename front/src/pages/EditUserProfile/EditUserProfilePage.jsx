import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import EditUserProfileMenu from '../../components/Menu/EditUserProfileMenu';
import EditAccountForm from '../../components/Form/EditUserProfile/EditAccountForm';
import EditPasswordForm from '../../components/Form/EditUserProfile/EditPasswordForm';
import EditContactForm from '../../components/Form/EditUserProfile/EditContactForm';
import EditPersonalProfileForm from '../../components/Form/EditUserProfile/EditPersonalProfileForm';

const EditUserProfilePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    if (!user) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    const [selectedSection, setSelectedSection] = useState('account');

    const renderForm = () => {
        switch (selectedSection) {
            case 'account':
                return <EditAccountForm />;
            case 'password':
                return <EditPasswordForm />;
            case 'personal-profile':
                return <EditPersonalProfileForm />;
            case 'proffesional-profile':
                return <p>Editar perfil profesional</p>;
            case 'preferences':
                return <p>Editar preferencias</p>;
            case 'contact':
                return <EditContactForm />;
            case 'delete-account':
                return <p>Borrar cuenta</p>;
            default:
                return <p>Editar cuenta</p>;
        }
    };

    return (
        <main className="edit-profile-page">
            <div className="container">

                <h1 className="title-40">Editar mi perfil</h1>

                <div className="edit-profile-page__content-container">
                    <EditUserProfileMenu
                        onSelect={setSelectedSection}
                        selectedSection={selectedSection}
                    />

                    <div className="edit-profile-page__content-container__form">
                        {renderForm()}
                    </div>
                </div>

            </div>
        </main>
    )
}

export default EditUserProfilePage;