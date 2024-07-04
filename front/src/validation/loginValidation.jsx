import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingresa un correo electrónico válido.')
        .required('El email es requerido.'),
    password: Yup.string()
        .required('La contraseña es requerida.'),
});