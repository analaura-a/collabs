import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Inputs/Input";
import { login } from "../../services/authService";
import { LoginSchema } from "../../validation/loginValidation";

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

            await LoginSchema.validate(formData, { abortEarly: false });
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

        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await login(formData);

            setFormData({
                email: '',
                password: '',
            });

            //Redirigir al usuario al inicio

        } catch (error) {

            if (error.message === "No existe una cuenta asociada a ese correo electrónico.") {
                setErrors({ email: error.message });
            } else if (error.message === "La contraseña es incorrecta.") {
                setErrors({ password: error.message });
            } else {
                console.log("Error del back") //Mostrárselo al usuario | setErrorMessage(error.message); 
            }

        } finally {
            setIsSubmitting(false);
        }

    }

    return (

        <form onSubmit={handleSubmit} noValidate>

            <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" name="email" value={formData.email} onChange={handleChange} errorText={errors.email} required></Input>

            <Input label="Contraseña" type="password" placeholder="***************" name="password" value={formData.password} onChange={handleChange} errorText={errors.password} required></Input>

            <Link to="/auth/contraseña-olvidada" className="helper-text link">¿Olvidaste tu contraseña?</Link>

            <Button type="submit" size="large" width="fullwidth" disabled={isSubmitting}>Iniciar sesión</Button>

        </form>

    )
}

export default LoginForm;