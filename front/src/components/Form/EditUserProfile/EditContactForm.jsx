import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserSocialsData } from "../../../services/userService";
import Button from "../../Button/Button";
import Input from "../../Inputs/Input";

const EditContactForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const { user } = authState;

    const [socials, setSocials] = useState({
        LinkedIn: "",
        GitHub: "",
        CodePen: "",
        Behance: "",
        Dribbble: "",
        Twitter: "",
        Instagram: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const socialTypes = {
        LinkedIn: "url",
        GitHub: "username",
        CodePen: "username",
        Behance: "url",
        Dribbble: "url",
        Twitter: "username",
        Instagram: "username"
    };

    // Función para buscar la URL o username de una red social en el array de objetos socials
    const getSocialValue = (socialName) => {
        const social = user.socials.find(s => s.name === socialName);
        return social ? social.url || social.username || "" : "";
    };

    useEffect(() => {
        if (user && user.socials) {
            setSocials({
                LinkedIn: getSocialValue("LinkedIn"),
                GitHub: getSocialValue("GitHub"),
                CodePen: getSocialValue("CodePen"),
                Behance: getSocialValue("Behance"),
                Dribbble: getSocialValue("Dribbble"),
                Twitter: getSocialValue("Twitter"),
                Instagram: getSocialValue("Instagram")
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSocials({
            ...socials,
            [name]: value
        });
    };

    // Función para construir el array actualizado de socials para enviar al backend
    const buildSocialsArray = () => {
        return Object.keys(socials).map(name => {
            const fieldType = socialTypes[name]; // Determinar si es 'url' o 'username'
            return {
                name,
                [fieldType]: socials[name] || null // Asignar el valor del campo correspondiente
            };
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updatedSocialsArray = buildSocialsArray();

            // Actualizar datos en la database
            await updateUserSocialsData(user._id, updatedSocialsArray);

            // Actualizar el contexto con la nueva información
            updateUser({
                ...user,
                socials: updatedSocialsArray
            });

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
                <Input label="LinkedIn" type="url" placeholder="www.linkedin.com/username" name="LinkedIn" helperText={"Link a tu perfil de LinkedIn."} value={socials.LinkedIn}
                    onChange={handleInputChange}></Input>

                <Input label="GitHub" type="text" placeholder="Nombre de usuario" name="GitHub" helperText={"Tu nombre de usuario de GitHub."} value={socials.GitHub}
                    onChange={handleInputChange}></Input>

                <Input label="CodePen" type="text" placeholder="Nombre de usuario" name="CodePen" helperText={"Tu nombre de usuario de CodePen."} value={socials.CodePen}
                    onChange={handleInputChange}></Input>

                <Input label="Behance" type="url" placeholder="www.behance.net/username" name="Behance" helperText={"Link a tu perfil de Behance."} value={socials.Behance}
                    onChange={handleInputChange}></Input>

                <Input label="Dribbble" type="url" placeholder="dribbble.com/username" name="Dribbble" helperText={"Link a tu perfil de Dribbble."} value={socials.Dribbble}
                    onChange={handleInputChange}></Input>

                <Input label="Twitter" type="text" placeholder="Nombre de usuario" name="Twitter" helperText={"Tu nombre de usuario de Twitter."} value={socials.Twitter}
                    onChange={handleInputChange}></Input>

                <Input label="Instagram" type="text" placeholder="Nombre de usuario" name="Instagram" helperText={"Tu nombre de usuario de Instagram."} value={socials.Instagram}
                    onChange={handleInputChange}></Input>
            </div>

            <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitting}>Guardar cambios</Button>

        </form>

    )
}

export default EditContactForm;