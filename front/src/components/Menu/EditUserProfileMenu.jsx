import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useToast } from '../../context/ToastContext';
import AuthContext from '../../context/AuthContext';
import { deleteAccount } from '../../services/authService';
import Modal from '../Modal/Modal';

const EditUserProfileMenu = ({ onSelect, selectedSection }) => {

    const { authState, logout } = useContext(AuthContext);
    const { addToast } = useToast();

    const navigate = useNavigate();

    /* Menú */
    const [isOpen, setIsOpen] = useState(false);

    const menuOptions = [
        { label: 'Cuenta', value: 'account' },
        { label: 'Contraseña', value: 'password' },
        { label: 'Información personal', value: 'personal-profile' },
        { label: 'Perfil profesional', value: 'professional-profile' },
        { label: 'Preferencias', value: 'preferences' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Contacto', value: 'contact' },
        { label: 'Eliminar cuenta', value: 'delete-account' },
    ];

    const handleSelect = (section) => {
        onSelect(section);
        setIsOpen(false);

        if (section == "delete-account") {
            handleOpenDeleteAccountModal();
        }
    };

    /* Modal */
    const [isDeleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
    const handleOpenDeleteAccountModal = () => setDeleteAccountModalOpen(true);
    const handleCloseDeleteAccountModal = () => setDeleteAccountModalOpen(false);

    const handleDeleteAccount = async () => {

        const userId = authState.user?._id;

        try {
            // 1. Cerrar sesión
            await logout();

            // 2. Redirigir a la página de inicio de sesión
            navigate('/auth/iniciar-sesion');

            // 3. Eliminar la cuenta
            await deleteAccount(userId);

            // 4. Mostrar notificación
            addToast({
                type: 'success',
                title: 'Tu cuenta ha sido eliminada con éxito',
                message: '¡Esperamos que vuelvas a colaborar pronto!'
            });

        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al eliminar tu cuenta',
                message: error.message || 'Ocurrió un error desconocido al intentar eliminar tu cuenta. Inténtalo de nuevo más tarde.'
            });
        }
    };

    return (
        <nav className="edit-profile-menu">

            {/* Menú mobile */}
            <div className="edit-profile-menu__mobile">
                <div className="edit-profile-menu__mobile__selected subtitle-light black-color-text" onClick={() => setIsOpen(!isOpen)}>
                    {menuOptions.find(option => option.value === selectedSection)?.label}
                </div>

                {isOpen && (
                    <ul className="edit-profile-menu__mobile__dropdown">

                        {menuOptions.map((option, index) => (
                            <li
                                key={option.value}
                                className={`edit-profile-menu__mobile__option subtitle-light ${selectedSection === option.value ? 'primary-color-text' : ''} ${index === menuOptions.length - 1 ? 'red-color-text' : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </li>
                        ))}

                    </ul>
                )}
            </div>

            {/* Menú desktop */}
            <ul className="edit-profile-menu__desktop">
                {menuOptions.map((option, index) => (
                    <li
                        key={option.value}
                        className={`edit-profile-menu__desktop__option subtitle-light ${index !== menuOptions.length - 1 && "edit-profile-menu__desktop__option-border"} ${selectedSection === option.value ? 'primary-color-text' : ''} ${index === menuOptions.length - 1 ? 'red-color-text' : ''}`}
                        onClick={() => handleSelect(option.value)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={isDeleteAccountModalOpen}
                onClose={handleCloseDeleteAccountModal}
                title={`¿Quieres eliminar tu cuenta definitivamente?`}
                subtitle="Esta es una acción que no se puede deshacer. Los proyectos que hayas creado también se eliminarán."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseDeleteAccountModal },
                    { label: 'Eliminar mi cuenta', color: 'red', size: "large", width: "fullwidth", onClick: handleDeleteAccount },
                ]}
            />

        </nav>
    );
};

export default EditUserProfileMenu;
