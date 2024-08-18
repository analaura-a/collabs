import { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { updateUserPreferencesData } from "../../../services/userService";
import Button from "../../Button/Button";
import OnboardingCheckboxWithDescription from '../../Inputs/OnboardingCheckboxWithDescription';

const EditPreferencesForm = () => {

    const { authState, updateUser } = useContext(AuthContext);
    const [preferences, setPreferences] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const preferenceOptions = [
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

    useEffect(() => {
        if (authState.user && authState.user.preferences) {
            setPreferences(authState.user.preferences);
        }
    }, [authState.user]);

    const handleCheckboxChange = (preference) => {
        if (preferences.includes(preference)) {
            setPreferences(preferences.filter((pref) => pref !== preference));
        } else {
            setPreferences([...preferences, preference]);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setIsSubmitting(true);

        try {
            // Actualizar datos en la database
            await updateUserPreferencesData(authState.user._id, preferences);

            // Actualizar el contexto con las nuevas preferencias
            updateUser({ ...authState.user, preferences });

            console.log("Se guardaron los cambios con éxito.") //Mostrar al usuario
        } catch (error) {
            console.log("Error del back", error) //Mostrárselo al usuario | setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSubmitDisabled = preferences.length === 0;

    return (

        <div className="edit-profile-page__form-container__with-title">
            <div className="edit-profile-page__form-container__title-with-subtitle">
                <h2 className="title-18">Tipo de proyectos que te interesan<span className="primary-color-text">*</span></h2>
                <p className="subtitle">Vamos a ajustar nuestras recomendaciones a tus preferencias.
                    Si lo deseas, puedes seleccionar ambos.</p>
            </div>

            <form className="edit-profile-page__form-container" onSubmit={handleSubmit} noValidate>

                <div className="onboarding-input-container">
                    {preferenceOptions.map((preference) => (
                        <OnboardingCheckboxWithDescription
                            key={preference.id}
                            id={preference.id}
                            svg={preference.svg}
                            title={preference.title}
                            description={preference.description}
                            isChecked={preferences.includes(preference.title)}
                            onChange={() => handleCheckboxChange(preference.title)}
                        />
                    ))}
                </div>

                <Button type="submit" size="large" width="full-then-fit" disabled={isSubmitDisabled || isSubmitting}>Guardar cambios</Button>

            </form>
        </div>

    )
}

export default EditPreferencesForm;