import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Inputs/Input";
import { register } from "../../services/authService";
import { SignupSchema } from "../../validation/signupValidation.jsx";

const SignupForm = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const validateForm = async () => {

        try {

            await SignupSchema.validate(formData, { abortEarly: false });
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


    const mapToApiFormat = (data) => {
        return {
            name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password,
        };
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        const apiData = mapToApiFormat(formData);

        try {
            const data = await register(apiData);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });

            //Iniciar sesión (crear token)
            //Redirigir a página de onboarding.

        } catch (error) {

            if (error.message === 'Ya existe una cuenta asociada a ese correo electrónico.') {
                setErrors({ email: error.message });
            } else {
                console.log("Error del back") //Mostrárselo al usuario | setErrorMessage(error.message); 
            }

        } finally {
            setIsSubmitting(false);
        }

    };


    return (

        <form onSubmit={handleSubmit} noValidate>

            <div className="form__fullname">
                <Input label="Nombre" type="text" placeholder="Nombre" name="firstName" value={formData.firstName} onChange={handleChange} errorText={errors.firstName} required></Input>
                <Input label="Apellido" type="text" placeholder="Apellido" name="lastName" value={formData.lastName} onChange={handleChange} errorText={errors.lastName} required></Input>
            </div>

            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" name="email" value={formData.email} onChange={handleChange} errorText={errors.email} required></Input>

            <Input label="Contraseña" type="password" placeholder="***************" helperText="Debe contener mínimo 8 caracteres." name="password" value={formData.password} onChange={handleChange} errorText={errors.password} required></Input>

            <Button type="submit" size="large" width="fullwidth" disabled={isSubmitting}>Crear cuenta</Button>

        </form>

    )
}

export default SignupForm;