import * as Yup from 'yup';

export const UserAccountDataSchema = Yup.object().shape({
    email: Yup.string()
        .email('Ingresa un correo electrónico válido.')
        .required('El email es requerido.'),
    username: Yup.string()
        .min(4, 'El nombre de usuario debe tener al menos 4 caracteres.')
        .max(15, 'El nombre de usuario no debe exceder los 15 caracteres.')
        .matches(/^[a-z0-9-]+$/, 'El nombre de usuario solo puede contener letras minúsculas, números o guiones.')
        .required('El nombre de usuario es requerido.')
});