import { useState } from 'react';

const EditUserProfileMenu = ({ onSelect, selectedSection }) => {

    const [isOpen, setIsOpen] = useState(false);

    const menuOptions = [
        { label: 'Cuenta', value: 'account' },
        { label: 'Contraseña', value: 'password' },
        { label: 'Información personal', value: 'personal-profile' },
        { label: 'Perfil profesional', value: 'proffesional-profile' },
        { label: 'Preferencias', value: 'preferences' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'Contacto', value: 'contact' },
        { label: 'Eliminar cuenta', value: 'delete-account' },
    ];

    const handleSelect = (section) => {
        onSelect(section);
        setIsOpen(false);
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

        </nav>
    );
};

export default EditUserProfileMenu;
