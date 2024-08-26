import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserSkills } from "../../../services/userService";
import Button from "../../Button/Button";
import SkillSearch from "../../Inputs/SkillSearch";

const EditProfessionalProfileForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const { user } = authState;

    const [skills, setSkills] = useState(user.skills || []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    //Skills
    const handleSkillAdd = (skill) => {
        setSkills([...skills, skill])
    }

    const handleSkillRemove = (skill) => {
        setSkills(skills.filter(s => s !== skill))
    };

    const handleUpdateSkills = async () => {
        try {
            const updatedUser = await updateUserSkills(user._id, skills);
            updateUser(updatedUser);
            console.log("Se guardaron los cambios con éxito.") //Mostrar al usuario
        } catch (error) {
            console.error('Error al actualizar las skills:', error);
        }
    };


    return (
        <div className="edit-profile-page__form-container__space-between-inputs">

            <div className="edit-profile-page__form-container">
                <div className="edit-profile-page__form-container__title-with-subtitle">
                    <h2 className="form-label">Skills<span className="primary-color-text">*</span></h2>
                    <p className="subtitle">Selecciona al menos 3 tecnologías o conocimientos que aplican a tu perfil profesional.</p>
                </div>

                <SkillSearch
                    selectedSkills={skills}
                    onSkillAdd={handleSkillAdd}
                    onSkillRemove={handleSkillRemove}
                />

                <Button size="large" width="full-then-fit" disabled={isSubmitting} onClick={handleUpdateSkills}>Guardar cambios</Button>
            </div>



        </div>
    )
}

export default EditProfessionalProfileForm;