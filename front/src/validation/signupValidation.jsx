import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .required('El nombre es requerido'),
    last_name: Yup.string()
        .required('El apellido es requerido'),
    email: Yup.string()
        .email('Ingresa un correo electrónico válido')
        .required('El email es requerido'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener mínimo 8 caracteres')
        .required('La contraseña es requerida.'),
});