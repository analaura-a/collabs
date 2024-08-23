import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";
import Textarea from "../../Inputs/Textarea";

const EditPersonalProfileForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [formData, setFormData] = useState({
        name: user.name || '',
        last_name: user.last_name || '',
        location: user.location || '',
        bio: user.bio || ''
    });
    const [profilePic, setProfilePic] = useState(null);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setErrors({ name: "El nombre es obligatorio." });
            return false;
        } else if (!formData.last_name.trim()) {
            setErrors({ last_name: "El apellido es obligatorio." });
            return false;
        } else {
            return true;
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const isValid = await validateForm();
            if (!isValid) {
                return;
            }

            setIsSubmitting(true);

        } catch (error) {
            console.log("Ocurrió un error al intentar actualizar el perfil.", error) //Mostrárselo al usuario
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="edit-profile-page__form-container" onSubmit={handleSubmit} noValidate>

            <div className="edit-profile-page__form-container__space-between-inputs">

                <div className="edit-profile-page__form-container__profile-photo">
                    <h2 className="form-label">Foto de perfil</h2>

                    <div className="edit-profile-page__form-container__profile-photo-section">
                        <div className="edit-profile-page__form-container__profile-photo-section__preview">
                            <img src={user.profile_pic || "../assets/jpg/no-profile-picture.jpg"} alt="Foto de perfil" />
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

                            <Button color="secondary" disabled={!user.profile_pic || isSubmitting}>
                                Eliminar foto
                            </Button>

                        </div>
                    </div>
                </div>

                <Input label="Nombre" type="text" placeholder="Nombre" name="name" value={formData.name} onChange={handleInputChange} errorText={errors.name} required></Input>

                <Input label="Apellido" type="text" placeholder="Apellido" name="last_name" value={formData.last_name} onChange={handleInputChange} errorText={errors.last_name} required></Input>

                <Input label="Ubicación" type="text" placeholder="Ciudad, Provincia, País" name="location" value={formData.location} onChange={handleInputChange}></Input>

                <Textarea label="Acerca de" rows={"10"} maxLength={1000} placeholder="¡Cuéntales a los demás quién eres!" name="bio" helperText={"Máximo 1000 caracteres."} value={formData.bio} onChange={handleInputChange} />
            </div>

            <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitting}>Guardar cambios</Button>

        </form>
    )
}

export default EditPersonalProfileForm;