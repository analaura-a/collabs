import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import EditUserProfileMenu from '../../components/Menu/EditUserProfileMenu';
import EditAccountForm from '../../components/Form/EditUserProfile/EditAccountForm';
import EditPasswordForm from '../../components/Form/EditUserProfile/EditPasswordForm';
import EditPersonalProfileForm from '../../components/Form/EditUserProfile/EditPersonalProfileForm';
import EditProfessionalProfileForm from '../../components/Form/EditUserProfile/EditProfessionalProfileForm';
import EditPreferencesForm from '../../components/Form/EditUserProfile/EditPreferencesForm';
import EditPortfolioForm from '../../components/Form/EditUserProfile/EditPortfolioForm';
import EditContactForm from '../../components/Form/EditUserProfile/EditContactForm';
import Loader from '../../components/Loader/Loader';

const EditUserProfilePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const location = useLocation();

    const [selectedSection, setSelectedSection] = useState('account');

    useEffect(() => {
        if (location.state?.section) {
            setSelectedSection(location.state.section);
        }
    }, [location.state]);

    const renderForm = () => {
        switch (selectedSection) {
            case 'account':
                return <EditAccountForm />;
            case 'password':
                return <EditPasswordForm />;
            case 'personal-profile':
                return <EditPersonalProfileForm />;
            case 'professional-profile':
                return <EditProfessionalProfileForm />;
            case 'preferences':
                return <EditPreferencesForm />;
            case 'portfolio':
                return <EditPortfolioForm />;
            case 'contact':
                return <EditContactForm />;
            case 'delete-account':
                return <></>;
            default:
                return <EditAccountForm />;
        }
    };

    if (!user) return <Loader />;

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