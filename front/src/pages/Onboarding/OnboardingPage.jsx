import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import { useToast } from '../../context/ToastContext';
import OnboardingStep from '../../components/Step/OnboardingStep';
import OnboardingForm1 from '../../components/Form/Onboarding/OnboardingForm1';
import OnboardingForm2 from '../../components/Form/Onboarding/OnboardingForm2';
import OnboardingForm3 from '../../components/Form/Onboarding/OnboardingForm3';
import OnboardingForm4 from '../../components/Form/Onboarding/OnboardingForm4';
import OnboardingForm5 from '../../components/Form/Onboarding/OnboardingForm5';
import OnboardingForm6 from '../../components/Form/Onboarding/OnboardingForm6';

const steps = [
    {
        title: 'Crea tu nombre de usuario',
        subtitle: 'Se verá reflejado en la URL pública de tu perfil. Debe tener mínimo 4 caracteres, estar en minúsculas y solo tener letras, números o guiones.',
        form: OnboardingForm1,
    },
    {
        title: '¿Cuál es tu perfil profesional?',
        subtitle: 'Selecciona los roles con los que te gustaría unirte a colaborar en proyectos.',
        form: OnboardingForm2,
    },
    {
        title: '¿Cuáles son tus skills?',
        subtitle: 'Selecciona las habilidades, tecnologías o conocimientos que aplican a tu perfil profesional (mínimo 3).',
        form: OnboardingForm3,
    },
    {
        title: '¿Cuál es tu nivel de conocimiento?',
        subtitle: 'La expertiz puede medirse de varias formas, pero por ahora solo elige el tiempo que llevas estudiando las skills que seleccionaste en el paso anterior.',
        form: OnboardingForm4,
    },
    {
        title: '¿Qué tipo de proyectos te interesan?',
        subtitle: 'Vamos a ajustar nuestras recomendaciones a tus preferencias. Si lo deseas, puedes seleccionar ambos.',
        form: OnboardingForm5,
    },
    {
        title: '¿Cuánto tiempo puedes dedicarle a los proyectos?',
        subtitle: 'El tiempo es estimativo, para que las demás personas puedan conocer cuál es el nivel de compromiso que puedes dedicarle a los proyectos.',
        form: OnboardingForm6,
    }
];

/*Este componente manejará:
-El estado del paso actual y la lógica de navegación entre los pasos. 
-Recopila los datos de todos los pasos y los envía al backend al finalizar el onboarding.
-Actualiza el contexto de autenticación con los nuevos datos del usuario.
*/
const OnboardingPage = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isStepValid, setIsStepValid] = useState(false);

    const navigate = useNavigate();

    const { authState, completeOnboarding } = useContext(AuthContext);
    const { addToast } = useToast();

    const nextStep = () => {
        if (isStepValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setIsStepValid(false);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setIsStepValid(true);
        }
    };

    const handleFormChange = (step, data) => {
        setFormData(prevData => ({
            ...prevData,
            [step]: data,
        }));
    };

    const handleFormValidation = (isValid) => {
        setIsStepValid(isValid);
    };

    const flattenFormData = (formData) => {
        return Object.values(formData).reduce((acc, data) => {
            return { ...acc, ...data };
        }, {});
    };

    const handleComplete = async () => {
        const flattenedData = flattenFormData(formData);
        try {
            await completeOnboarding(authState.user._id, flattenedData);
            navigate('/auth/onboarding-completado');
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al completar el onboarding',
                message: 'Ocurrió un error desconocido al intentar completar el onboarding. Inténtalo de nuevo más tarde.'
            });
        }
    };

    const CurrentForm = steps[currentStep].form;

    return (
        <main className='faded-pattern-container'>

            <div className="faded-pattern faded-pattern-top-left"></div>
            <div className="faded-pattern faded-pattern-bottom-right"></div>

            <section className="onboarding-page-container">

                <img src='../assets/svg/collabs-logo.svg' alt="Collabs" />

                <OnboardingStep
                    title={steps[currentStep].title}
                    subtitle={steps[currentStep].subtitle}
                    form={<CurrentForm onChange={data => handleFormChange(currentStep, data)} onValidate={handleFormValidation} initialData={formData[currentStep]} />}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    isNextDisabled={!isStepValid}
                    handleComplete={handleComplete}
                />

            </section>

        </main>
    )

}

export default OnboardingPage;