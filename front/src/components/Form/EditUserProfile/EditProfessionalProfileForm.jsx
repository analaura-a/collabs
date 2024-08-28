import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserSkills, updateUserRoles } from "../../../services/userService";
import Button from "../../Button/Button";
import SkillSearch from "../../Inputs/SkillSearch";

const EditProfessionalProfileForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const { user } = authState;

    const [roles, setRoles] = useState(user.roles || []);
    const [skills, setSkills] = useState(user.skills || []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    //Roles
    const availableRoles = ['UX/UI Designer', 'Web Designer', 'Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Mobile Developer', 'No-code Developer', 'Project Manager', 'QA Tester'];

    const handleRoleChange = (role) => {
        setRoles((prevSelectedRoles) =>
            prevSelectedRoles.includes(role)
                ? prevSelectedRoles.filter((r) => r !== role)
                : [...prevSelectedRoles, role]
        );
    };

    const handleUpdateRoles = async () => {
        try {
            setIsSubmitting(true);
            const updatedUser = await updateUserRoles(user._id, roles);
            updateUser(updatedUser);
            console.log("Se guardaron los cambios con éxito.") //Mostrar al usuario
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error al actualizar los roles:', error);
            setIsSubmitting(false);
        }
    };


    //Skills
    const handleSkillAdd = (skill) => {
        setSkills([...skills, skill])
    }

    const handleSkillRemove = (skill) => {
        setSkills(skills.filter(s => s !== skill))
    };

    const handleUpdateSkills = async () => {
        try {
            setIsSubmitting(true);
            const updatedUser = await updateUserSkills(user._id, skills);
            updateUser(updatedUser);
            console.log("Se guardaron los cambios con éxito.") //Mostrar al usuario
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error al actualizar las skills:', error);
            setIsSubmitting(false);
        }
    };


    return (
        <div className="edit-profile-page__form-container__space-between-forms">

            <div className="edit-profile-page__form-container">
                <div className="edit-profile-page__form-container__title-with-subtitle">
                    <h2 className="form-label">Perfil profesional<span className="primary-color-text">*</span></h2>
                    <p className="subtitle">Selecciona los roles con los que te gustaría unirte a colaborar en proyectos.</p>
                </div>

                <form className="edit-profile-page__form-container__inputs-container">
                    {availableRoles.map((role) => (
                        <div key={role} className={`checkbox-item ${roles.includes(role) ? 'checkbox-item-checked' : ''}`} onClick={() => handleRoleChange(role)}>

                            <input
                                type="checkbox"
                                name="roles"
                                id={role}
                                value={role}
                                checked={roles.includes(role)}
                                onChange={(e) => e.stopPropagation()}
                                className="hidden-input"
                            />

                            <label htmlFor={role} onClick={() => handleRoleChange(role)}>
                                {role}
                            </label>

                            <div className="checkbox-circle"></div>

                        </div>
                    ))}
                </form>

                <Button size="large" width="full-then-fit" disabled={isSubmitting} onClick={handleUpdateRoles}>Guardar cambios</Button>
            </div>

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