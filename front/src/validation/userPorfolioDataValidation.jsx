import * as yup from "yup";

const portfolioValidationSchema = yup.object().shape({
    portfolioLink: yup.string().url('Debe ser una URL válida.')
});

export default portfolioValidationSchema;
