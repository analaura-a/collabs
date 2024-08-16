import { useState, useEffect } from 'react';
import * as yup from 'yup';
import Input from "../../Inputs/Input";
import { checkUsernameAvailability } from '../../../services/userService';

const usernameSchema = yup.string()
    .matches(/^[a-z0-9-]+$/, 'El username solo puede contener letras minúsculas, números y guiones.')
    .min(4, 'El username debe tener entre 4 y 15 caracteres.')
    .max(15, 'El username debe tener entre 4 y 15 caracteres.');

const OnboardingForm1 = ({ onChange, onValidate, initialData }) => {

    const [username, setUsername] = useState(initialData?.username || '');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const validateUsername = async (username) => {
        try {
            //Validar requisitos para el username
            await usernameSchema.validate(username);

            //Validar username único en el back
            const isAvailable = await checkUsernameAvailability(username);
            if (isAvailable) {
                setError('');
                setIsValid(true);
            }
        } catch (validationError) {
            setError(validationError.message);
            setIsValid(false);
        }
    };

    useEffect(() => {
        if (username === "") {
            return
        } else {
            validateUsername(username);
        }
    }, [username]);

    useEffect(() => {
        onChange({ username });
        onValidate(isValid);
    }, [username, isValid]);

    return (

        <form className="onboarding-form-1" onSubmit={(e) => { e.preventDefault() }} noValidate>
            <Input label="Nombre de usuario" id="username" name="username" placeholder="Nombre de usuario" helperText={'collabs.com/colaboradores/' + username} errorText={error} value={username} onChange={(e) => setUsername(e.target.value)} required />
        </form>

    );

};

export default OnboardingForm1;