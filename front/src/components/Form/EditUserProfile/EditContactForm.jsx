import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditContactForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <form className="edit-profile-page__form-container" noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Portfolio" type="url" placeholder="www.portfolio.com" name="portfolio" helperText={"Tu portfolio se verá destacado en tu perfil, para cualquiera que quiera conocer un poco más acerca de tus trabajos."}></Input>

                <Input label="LinkedIn" type="url" placeholder="www.linkedin.com/username" name="linkedin" helperText={"Link a tu perfil de LinkedIn."}></Input>

                <Input label="GitHub" type="text" placeholder="Nombre de usuario" name="github" helperText={"Tu nombre de usuario de GitHub."}></Input>

                <Input label="CodePen" type="text" placeholder="Nombre de usuario" name="codepen" helperText={"Tu nombre de usuario de CodePen."}></Input>

                <Input label="Behance" type="url" placeholder="www.behance.net/username" name="behance" helperText={"Link a tu perfil de Behance."}></Input>

                <Input label="Dribbble" type="url" placeholder="dribbble.com/username" name="dribbble" helperText={"Link a tu perfil de Dribbble."}></Input>

                <Input label="Twitter" type="text" placeholder="Nombre de usuario" name="twitter" helperText={"Tu nombre de usuario de Twitter."}></Input>

                <Input label="Instagram" type="text" placeholder="Nombre de usuario" name="instagram" helperText={"Tu nombre de usuario de Instagram."}></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

        </form>

    )
}

export default EditContactForm;