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

                <div className="edit-profile-page__form-container__profile-photo">
                    <h2 className="form-label">Foto de perfil</h2>

                    <div className="edit-profile-page__form-container__profile-photo-section">
                        <div className="edit-profile-page__form-container__profile-photo-section__preview">
                            <img src="https://st2.depositphotos.com/1006318/5909/v/950/depositphotos_59095205-stock-illustration-businessman-profile-icon.jpg" alt="Foto de perfil" />
                        </div>

                        <div className="edit-profile-page__form-container__profile-photo-section__actions">

                            <label htmlFor="profilePhotoInput">
                                <Button>Subir una nueva foto</Button>
                                <input
                                    type="file"
                                    id="profilePhotoInput"
                                    name="profile_pic"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                            </label>

                            <Button color="secondary" disabled={!user.profile_pic}>
                                Eliminar foto
                            </Button>

                        </div>
                    </div>
                </div>

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