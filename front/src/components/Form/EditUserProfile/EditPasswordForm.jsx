import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";
import { passwordSchema } from "../../../validation/newPasswordValidation";
import { changePassword } from "../../../services/authService";
import { useToast } from "../../../context/ToastContext";

const EditPasswordForm = () => {

    const { authState } = useContext(AuthContext);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addToast } = useToast();

    const validateForm = async () => {

        const updatedFields = {
            currentPassword,
            newPassword
        };

        try {
            await passwordSchema.validate(updatedFields, { abortEarly: false });
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

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const isValid = await validateForm();
            if (!isValid) {
                return;
            }

            setIsSubmitting(true);

            // Actualizar datos en la database
            await changePassword(authState.user._id, currentPassword, newPassword);

            addToast({
                type: 'success',
                title: '¡Contraseña actualizada con éxito!',
                message: 'Se guardaron correctamente los nuevos datos.'
            });

            setCurrentPassword('');
            setNewPassword('');

        } catch (error) {

            if (error.message === "La contraseña actual es incorrecta.") {
                setErrors({ currentPassword: error.message })
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al guardar los datos de la contraseña',
                    message: 'Ocurrió un error desconocido al intentar guardar los nuevos datos. Inténtalo de nuevo más tarde.'
                });
            }

        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <form className="edit-profile-page__form-container" onSubmit={handleSubmit} noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Contraseña actual" type="password" placeholder="**********" name="old_password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} errorText={errors.currentPassword} required></Input>
                <Input label="Nueva contraseña" type="password" placeholder="**********" name="new_password" helperText={"Debe contener mínimo 8 caracteres."} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} errorText={errors.newPassword} required></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitting}>Guardar cambios</Button>

        </form>

    )
}

export default EditPasswordForm;