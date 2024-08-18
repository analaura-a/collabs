import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import Button from "../../Button/Button";
import OnboardingCheckboxWithDescription from '../../Inputs/OnboardingCheckboxWithDescription';

const preferences = [
    {
        id: 'preference1',
        svg: '../../assets/svg/personal-project.svg',
        title: 'Personal',
        description: 'Los proyectos personales (“cerrados”) son aquellos en los que solo el equipo de personas trabajando en él puede acceder y colaborar activamente en su realización.'
    },
    {
        id: 'preference2',
        svg: '../../assets/svg/open-source-project.svg',
        title: 'Open-source',
        description: 'Los proyectos open-source son aquellos en los que su diseño y desarrollo son compartidos públicamente, por lo que cualquier persona puede unirse a contribuir en cualquier momento.'
    }
];

const EditPreferencesForm = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    return (

        <div className="edit-profile-page__form-container__with-title">
            <div className="edit-profile-page__form-container__title-with-subtitle">
                <h2 className="title-18">Tipo de proyectos que te interesan<span className="primary-color-text">*</span></h2>
                <p className="subtitle">Vamos a ajustar nuestras recomendaciones a tus preferencias.
                    Si lo deseas, puedes seleccionar ambos.</p>
            </div>

            <form className="edit-profile-page__form-container" noValidate>

                <div className="onboarding-input-container">
                    {preferences.map((preference) => (
                        <OnboardingCheckboxWithDescription
                            key={preference.id}
                            id={preference.id}
                            svg={preference.svg}
                            title={preference.title}
                            description={preference.description}
                        />
                    ))}
                </div>

                <Button type="submit" size="large" width="full-then-fit">Guardar cambios</Button>

            </form>
        </div>

    )
}

export default EditPreferencesForm;