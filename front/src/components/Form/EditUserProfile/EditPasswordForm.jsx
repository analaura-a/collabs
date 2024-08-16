import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditPasswordForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <form className="edit-profile-page__form-container" noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">
                <Input label="Contraseña actual" type="password" placeholder="**********" name="old_password" required></Input>
                <Input label="Nueva contraseña" type="password" placeholder="**********" name="new_password" helperText={"Debe contener mínimo 8 caracteres."} required></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

        </form>

    )
}

export default EditPasswordForm;