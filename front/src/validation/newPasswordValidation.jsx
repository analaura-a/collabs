import * as yup from 'yup';

export const passwordSchema = yup.object().shape({
    currentPassword: yup.string().required('La contraseña actual es obligatoria.'),
    newPassword: yup.string()
        .required('La nueva contraseña es obligatoria.')
        .min(8, 'La nueva contraseña debe tener al menos 8 caracteres.')
});