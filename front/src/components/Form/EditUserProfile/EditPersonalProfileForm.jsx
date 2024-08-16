import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";
import Textarea from "../../Inputs/Textarea";

const EditPersonalProfileForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <form className="edit-profile-page__form-container" noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">

                {/* <div className="input-group">
                    <label htmlFor="profile_pic" className="form-label">Foto de perfil</label>
                    <input
                        type="file"
                        name="profile_pic"
                        id="profile_pic"
                    // onChange={onChange}
                    // placeholder={placeholder}
                    />
                </div> */}

                <Input label="Nombre" type="text" placeholder="Nombre" name="name" required></Input>

                <Input label="Apellido" type="text" placeholder="Apellido" name="last_name" required></Input>

                <Input label="Ubicación" type="text" placeholder="Ciudad, Provincia, País" name="location"></Input>

                <Textarea label="Acerca de" rows={"10"} maxLength={1000} placeholder="¡Cuéntales a los demás quién eres!" name="bio" helperText={"Máximo 1000 caracteres."} />
            </div>

            <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

        </form>

    )
}

export default EditPersonalProfileForm;