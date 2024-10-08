import * as yup from "yup";

const shortcutValidationSchema = yup.object().shape({
    name: yup.string().required('El nombre del atajo es requerido.'),
    url: yup.string().url('Debe ser una URL válida.').required('La URL del atajo es requerida.')
});

export default shortcutValidationSchema;
