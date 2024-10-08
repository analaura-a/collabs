import { useState } from "react";
import { createProjectShortcut } from "../../services/shortcutService";
import shortcutValidationSchema from "../../validation/projectShortcutValidation";
import Button from "./Button";
import Modal from "../Modal/Modal";
import Input from "../Inputs/Input";
import AddIcon from '../../assets/svg/add.svg?react';

const AddShortcutButton = ({ project, reloadShortcuts }) => {

    const [newShortcutName, setNewShortcutName] = useState('');
    const [newShortcutUrl, setNewShortcutUrl] = useState('');

    const [errors, setErrors] = useState({});

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const handleOpenAddModal = () => setAddModalOpen(true);
    const handleCloseAddModal = () => setAddModalOpen(false);

    const validateForm = async () => {
        try {
            await shortcutValidationSchema.validate({ name: newShortcutName, url: newShortcutUrl }, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(formattedErrors);
            return false;
        }
    };

    const handleAddShortcut = async () => {

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        try {
            await createProjectShortcut(project._id, newShortcutName, newShortcutUrl);

            console.log('Atajo creado con éxito'); //Mostrar al usuario

            reloadShortcuts();

            setAddModalOpen(false);
        } catch (error) {
            console.error('Error al crear el atajo:', error);
        }
    };

    return (
        <>
            <Button size="large" width="fullwidth" color="secondary" icon={<AddIcon />} onClick={handleOpenAddModal}>Agregar atajo rápido</Button>

            <Modal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                title="Nuevo atajo rápido"
                actions={[
                    { label: 'Agregar atajo', color: 'primary', size: "large", width: "fullwidth", onClick: handleAddShortcut },
                ]}
            >
                <form className="shortcut-card-modal__content">
                    <Input
                        label="Nombre del atajo"
                        placeholder="Ej: servidor de Discord"
                        name="name"
                        value={newShortcutName}
                        onChange={(e) => setNewShortcutName(e.target.value)}
                        errorText={errors.name}
                        required
                    />
                    <Input
                        label="URL"
                        placeholder="https://www.link.com"
                        name="url"
                        value={newShortcutUrl}
                        onChange={(e) => setNewShortcutUrl(e.target.value)}
                        errorText={errors.url}
                        required
                    />
                </form>
            </Modal>
        </>
    );
};

export default AddShortcutButton;
