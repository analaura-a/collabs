import * as Yup from 'yup';

const reviewSchema = Yup.object().shape({
    recommend: Yup.boolean()
        .nullable()
        .required('Por favor selecciona una de las opciones.'),
    comment: Yup.string()
        .trim()
        .required('Por favor, añade toda la información que creas relevante sobre esta experiencia colaborativa.')
        .max(1500, 'La reseña no puede tener más de 1500 caracteres.'),
});

export default reviewSchema;