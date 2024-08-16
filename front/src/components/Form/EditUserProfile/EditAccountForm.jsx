import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserAccountData } from "../../../services/userService";
import { UserAccountDataSchema } from "../../../validation/userAccountDataValidation";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditAccountForm = () => {

    const { authState, updateUser } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            // return console.log("es valido")
        } catch (validationErrors) {
            const formattedErrors = validationErrors.inner.reduce((acc, error) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(formattedErrors);
            return false;
            // console.log("no es valido")
        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) {
            return;
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