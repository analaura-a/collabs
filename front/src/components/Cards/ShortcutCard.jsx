import { useState } from "react";
import { updateProjectShortcut, deleteProjectShortcut } from "../../services/shortcutService";
import shortcutValidationSchema from "../../validation/projectShortcutValidation";
import DropdownButton from "../Button/DropdownButton";
import Modal from "../Modal/Modal";
import Input from "../Inputs/Input";

const ShortcutCard = ({ shortcut, project, reloadShortcuts }) => {

    const { _id, name, url } = shortcut;

    const formattedUrl = url.replace(/^https?:\/\/(www\.)?/, '');

    /* Modal (editar) */
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedUrl, setUpdatedUrl] = useState(url);

    const [errors, setErrors] = useState({});

    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const handleOpenEditModal = () => setEditModalOpen(true);
    const handleCloseEditModal = () => setEditModalOpen(false);

    const validateForm = async () => {
        try {
            await shortcutValidationSchema.validate({ name: updatedName, url: updatedUrl }, { abortEarly: false });
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

    const handleEditShortcut = async () => {

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        try {
            await updateProjectShortcut(_id, project._id, updatedName, updatedUrl);

            console.log('Atajo actualizado con éxito'); //Mostrar al usuario

            reloadShortcuts();

            handleCloseEditModal();
        } catch (error) {
            console.error('Error al actualizar el atajo:', error);
        }
    };

    /* Modal (eliminar) */
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const handleOpenDeleteModal = () => setDeleteModalOpen(true);
    const handleCloseDeleteModal = () => setDeleteModalOpen(false);

    const handleDeleteShortcut = async () => {
        try {
            await deleteProjectShortcut(_id, project._id);

            console.log('Atajo eliminado con éxito'); //Mostrar al usuario

            reloadShortcuts();

            handleCloseDeleteModal();
        } catch (error) {
            console.error('Error al eliminar el atajo:', error);
        }
    };

    return (
        <article className="shortcut-card">

            <a href={url} target="_blank" rel="noopener noreferrer" className="shortcut-card__link">
                <div className="shortcut-card__icon" >
                    <img src={`https://www.google.com/s2/favicons?domain=${shortcut.url}`} alt="URL" />
                </div>

                <div className="shortcut-card__details">
                    <h3 className="subtitle medium-text black-color-text">{name}</h3>
                    <p className="smaller-paragraph-light">{formattedUrl}</p>
                </div>
            </a>

            <DropdownButton options={[
                { title: 'Editar atajo', onClick: handleOpenEditModal },
                { title: 'Eliminar atajo', onClick: handleOpenDeleteModal }
            ]} />

            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                title="Editar atajo rápido"
                actions={[
                    { label: 'Actualizar', color: 'primary', size: "large", width: "fullwidth", onClick: handleEditShortcut },
                ]}
            >
                <form className="shortcut-card-modal__content">
                    <Input
                        label="Nombre del atajo"
                        placeholder="Ej: servidor de Discord"
                        name="name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        errorText={errors.name}
                        required
                    />
                    <Input
                        label="URL"
                        placeholder="https://www.link.com"
                        name="url"
                        value={updatedUrl}
                        onChange={(e) => setUpdatedUrl(e.target.value)}
                        errorText={errors.url}
                        required
                    />
                </form>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                title="¿Eliminar atajo rápido?"
                subtitle="Cuidado, esta acción no se puede deshacer."
                actions={[
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseDeleteModal },
                    { label: 'Eliminar', color: 'red', size: "large", width: "fullwidth", onClick: handleDeleteShortcut },
                ]}
            />

        </article>
    );
};

export default ShortcutCard;
