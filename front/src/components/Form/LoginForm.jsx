import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Inputs/Input";
import AuthContext from "../../context/AuthContext.jsx";
import { LoginSchema } from "../../validation/loginValidation";
import { useToast } from "../../context/ToastContext.jsx";

const LoginForm = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const { addToast } = useToast();

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

            //Iniciar sesión (crear token)
            const auth = await login(formData);

            setFormData({
                email: '',
                password: '',
            });

            //Redirigir usuario al home
            navigate('/inicio');

        } catch (error) {

            if (error.message === "No existe una cuenta asociada a ese correo electrónico.") {
                setErrors({ email: error.message });
            } else if (error.message === "La contraseña es incorrecta.") {
                setErrors({ password: error.message });
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al iniciar sesión',
                    message: 'Ocurrió un error desconocido al intentar iniciar sesión con esta cuenta. Inténtalo de nuevo más tarde.'
                });
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