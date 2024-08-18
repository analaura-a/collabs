import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditPortfolioForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <form className="edit-profile-page__form-container" noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Portfolio" type="url" placeholder="www.portfolio.com" name="portfolio" helperText={"Tu portfolio se verá destacado en tu perfil, para cualquiera que quiera conocer un poco más acerca de tus trabajos."}></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

        </form>

    )
}

export default EditPortfolioForm;