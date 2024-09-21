import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { createProject, uploadProjectImage } from '../../services/projectService';
import { addMemberToProjectTeam } from '../../services/teamService';
import CreateProjectStep from '../../components/Step/CreateProjectStep';
import CreateProjectForm1 from '../../components/Form/CreateProject/OpenSource/CreateProjectForm1';
import CreateProjectForm2 from '../../components/Form/CreateProject/OpenSource/CreateProjectForm2';

const steps = [
    {
        step: "1",
        title: "Información del proyecto",
        subtitle: "Añade toda la información del proyecto necesaria para que aquellas personas interesadas en contribuir puedan conocerlo y decidir si participar en él.",
        form: CreateProjectForm1,
    },
    {
        step: "2",
        title: "Colaboradores buscados",
        subtitle: "Añade todos los perfiles que estás buscando y las habilidades que necesitan para contribuir al proyecto.",
        form: CreateProjectForm2,
    },
];


const CreatOpenSourceProjectPage = () => {

    const { authState } = useContext(AuthContext);

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isStepValid, setIsStepValid] = useState(false);

    const navigate = useNavigate();

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

        const projectImage = flattenedData.cover;
        delete flattenedData.cover;

        try {
            // Paso 1: Crear el proyecto open-source
            const createdProject = await createProject(authState.user._id, flattenedData, 'Open-source');
            const projectId = createdProject.project.insertedId;

            // Paso 2: Subir la imagen del proyecto (si el usuario seleccionó una)
            if (projectImage) {
                const uploadedImage = await uploadProjectImage(projectId, projectImage);
                console.log('Imagen subida con éxito:', uploadedImage.imageUrl);
            }

            // Paso 3: Agregar al organizador al equipo del proyecto
            await addMemberToProjectTeam(
                projectId,
                authState.user._id,
                'Organizador',
                null
            );

            console.log("Proyecto creado con éxito"); //Notificar al usuario

            navigate('/mis-proyectos'); // Redirigir al dashboard del proyecto
        } catch (error) {
            console.error('Error al completar la creación del proyecto:', error);
        }
    };

    return (
        <main>
            <div className="container">

                <section className="create-project-page">
                    <h1 className="title-40 new-project-page__title">Crear convocatoria para un proyecto <span className="primary-color-text">open-source</span></h1>

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

export default CreatOpenSourceProjectPage;