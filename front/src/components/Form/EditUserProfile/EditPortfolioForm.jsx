import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import portfolioValidationSchema from "../../../validation/userPorfolioDataValidation";
import { updateUserPortfolioData } from "../../../services/userService";
import { useToast } from "../../../context/ToastContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditPortfolioForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const { user } = authState;

    const [portfolioLink, setPortfolioLink] = useState(user.portfolio_link || '');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        if (user && user.portfolio_link) {
            setPortfolioLink(user.portfolio_link);
        }
    }, [user]);

    const validateForm = async () => {

        const updatedField = {
            portfolioLink
        };

        try {
            await portfolioValidationSchema.validate(updatedField, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            setErrors({ portfolioLink: validationErrors.message });
            return false;
        }

    };

    const handleInputChange = (e) => {
        setPortfolioLink(e.target.value);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const isValid = await validateForm();
            if (!isValid) {
                return;
            }

            // Actualizar datos en la database
            await updateUserPortfolioData(user._id, portfolioLink);

            // Actualizar el contexto con la nueva información
            updateUser({
                ...user,
                portfolio_link: portfolioLink
            });

            setIsSubmitting(true);

            addToast({
                type: 'success',
                title: '¡Portfolio actualizado con éxito!',
                message: 'Se guardaron correctamente los nuevos datos.'
            });
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al actualizar el portfolio',
                message: 'Ocurrió un error desconocido al intentar actualizar el portfolio. Inténtalo de nuevo más tarde.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <form className="edit-profile-page__form-container" onSubmit={handleSubmit} noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Portfolio" type="url" placeholder="www.portfolio.com" name="portfolioLink" helperText={"Tu portfolio se verá destacado en tu perfil, para cualquiera que quiera conocer un poco más acerca de tus trabajos."} value={portfolioLink} onChange={handleInputChange} errorText={errors.portfolioLink}></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitting}>Guardar cambios</Button>

        </form>

    )
}

export default EditPortfolioForm;