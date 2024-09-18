import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import CreateProjectStep from '../../components/Step/CreateProjectStep';
import CreateProjectForm1 from '../../components/Form/CreateProject/Personal/CreateProjectForm1';
import CreateProjectForm2 from '../../components/Form/CreateProject/Personal/CreateProjectForm2';

const steps = [
    {
        step: "1",
        title: "Información del proyecto",
        subtitle: "Añade toda la información del proyecto necesaria para que aquellas personas interesadas en colaborar puedan conocerlo y decidir si participar en él.",
        form: CreateProjectForm1,
    },
    {
        step: "2",
        title: "Tu rol en el proyecto",
        subtitle: "Selecciona el perfil profesional que más se adecúe al rol que ocuparás dentro de este proyecto.",
        form: CreateProjectForm2,
    },
];


const CreatePersonalProjectPage = () => {

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isStepValid, setIsStepValid] = useState(false);

    const CurrentForm = steps[currentStep].form;

    const nextStep = () => {
        if (isStepValid && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setIsStepValid(false); // Reset validation for the next step
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setIsStepValid(true); // Assume previous step is valid
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
        return Object.values(formData).reduce((acc, data) => ({ ...acc, ...data }), {});
    };

    const handleComplete = async () => {
        const flattenedData = flattenFormData(formData);
        //Al momento de crear el proyecto, excluir founder_role de flattenedData (eso ponerlo en project_team)
        try {
            console.log('Proyecto creado con éxito:', flattenedData);
        } catch (error) {
            console.error('Error al crear el proyecto:', error);
        }
    };

    return (
        <main>
            <div className="container">

                <section className="create-project-page">
                    <h1 className="title-40 new-project-page__title">Crear convocatoria para un proyecto <span className="primary-color-text">personal</span></h1>

                    <CreateProjectStep
                        step={steps[currentStep].step}
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

            </div>
        </main>
    )
}

export default CreatePersonalProjectPage;