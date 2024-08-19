import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import portfolioValidationSchema from "../../../validation/userPorfolioDataValidation";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditPortfolioForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const { user } = authState;

    const [portfolioLink, setPortfolioLink] = useState(user.portfolio_link || '');

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            setIsSubmitting(true);

            console.log("Se guardaron los cambios con éxito.") //Mostrar al usuario
        } catch (error) {
            console.log("Error del back", error) //Mostrárselo al usuario | setErrorMessage(error.message);
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