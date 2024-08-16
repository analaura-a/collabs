import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditAccountForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <form className="edit-profile-page__form-container" noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Correo electrónico" type="email" placeholder="ejemplo@email.com" name="email" required></Input>

                <Input label="Nombre de usuario" type="text" placeholder="Nombre de usuario" name="username" helperText={`Debe estar en minúsculas. Además, se verá reflejado en la URL de tu perfil (collabs.com/${user.username}).`} required></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

        </form>

    )
}

export default EditAccountForm;