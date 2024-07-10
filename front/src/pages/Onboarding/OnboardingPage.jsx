import { useState } from 'react';
import OnboardingStep from '../../components/Step/OnboardingStep';

const steps = [
    {
        title: 'Crea tu nombre de usuario',
        subtitle: 'Se verá reflejado en la URL pública de tu perfil. Debe tener máximo 15 caracteres, estar en minúsculas y solo tener letras, números o guiones.',
        // form: <OnboardingForm1 />,
    },
    {
        title: '¿Cuál es tu perfil profesional?',
        subtitle: 'Selecciona los roles con los que te gustaría unirte a colaborar en proyectos',
        // form: <OnboardingForm2 />,
    }
];

/*Este componente manejará:
-El estado del paso actual y la lógica de navegación entre los pasos. 
-Recopila los datos de todos los pasos y los envía al backend al finalizar el onboarding.
-Actualiza el contexto de autenticación con los nuevos datos del usuario.
*/
const OnboardingPage = () => {

    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (

        <section className="onboarding-page-container">

            <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />

            <OnboardingStep/>

        </section>

    )

}

export default OnboardingPage;