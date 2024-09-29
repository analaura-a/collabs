import * as Yup from 'yup';

export const editPersonalProjectSchema = Yup.object().shape({
    name: Yup.string().required('El nombre del proyecto es requerido.'),
    about: Yup.string().required('La descripción del proyecto es requerida.'),
    required_availability: Yup.string()
        .required('La disponibilidad del proyecto es requerida.')
        .min(1, 'Selecciona una disponibilidad válida.')
});

export const editOpenSourceProjectSchema = Yup.object().shape({
    name: Yup.string().required('El nombre del proyecto es requerido.'),
    about: Yup.string().required('La descripción del proyecto es requerida.'),
    url: Yup.string()
        .required('El link al repositorio es requerido.')
        .url('Ingresa una URL válida.'),
});