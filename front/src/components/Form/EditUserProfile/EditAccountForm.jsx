import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserAccountData } from "../../../services/userService";
import { UserAccountDataSchema } from "../../../validation/userAccountDataValidation";
import { useToast } from "../../../context/ToastContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditAccountForm = () => {

    const { authState, updateUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        if (authState.user) {
            setEmail(authState.user.email);
            setUsername(authState.user.username);
        }
    }, [authState.user]);

    const validateForm = async () => {

        const updatedFields = {
            email,
            username
        };

        try {
            await UserAccountDataSchema.validate(updatedFields, { abortEarly: false });
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

            // Solo incluir los campos que cambiaron
            const fieldsToUpdate = {};

            if (email !== authState.user.email) {
                fieldsToUpdate.newEmail = email;
            }
            if (username !== authState.user.username) {
                fieldsToUpdate.newUsername = username;
            }

            if (Object.keys(fieldsToUpdate).length === 0) {

                addToast({
                    type: 'info',
                    title: 'No hay cambios para guardar',
                    message: 'Los datos son los mismos que están guardados actualmente.'
                });

                setIsSubmitting(false);

                return;
            }

            // Actualizar datos en la database
            const data = await updateUserAccountData(authState.user._id, fieldsToUpdate);

            // Actualizar el contexto con la nueva información
            updateUser({ ...authState.user, email, username });

            addToast({
                type: 'success',
                title: '¡Datos de la cuenta actualizados con éxito!',
                message: 'Se guardaron correctamente los nuevos datos.'
            });

        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al guardar los datos de la cuenta',
                message: 'Ocurrió un error desconocido al intentar guardar los nuevos datos. Inténtalo de nuevo más tarde.'
            });
        } finally {
            setIsSubmitting(false);
        }

    };

    return (

        <form className="edit-profile-page__form-container" onSubmit={handleSubmit} noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} errorText={errors.email} required></Input>

                <Input label="Nombre de usuario" type="text" placeholder="Nombre de usuario" name="username" helperText={`Debe estar en minúsculas. Además, se verá reflejado en la URL de tu perfil (collabs.com/${authState.user.username}).`} value={username} onChange={(e) => setUsername(e.target.value)} errorText={errors.username} required></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitting}>Guardar cambios</Button>

        </form>

    )
}

export default EditAccountForm;