import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import OnboardingCheckboxWithDescription from "../../components/Inputs/OnboardingCheckboxWithDescription";
import Button from "../../components/Button/Button";

const NewProjectPage = () => {

    const [projectType, setProjectType] = useState(null);

    const navigate = useNavigate();

    const typeOptions = [
        {
            id: 'type-1',
            svg: '../../assets/svg/personal-project.svg',
            title: 'Personal',
            description: 'Los proyectos personales (“cerrados”) son aquellos en los que solo el equipo de personas trabajando en él puede acceder y colaborar activamente en su realización.'
        },
        {
            id: 'type-2',
            svg: '../../assets/svg/open-source-project.svg',
            title: 'Open-source',
            description: 'Los proyectos open-source son aquellos en los que su diseño y desarrollo son compartidos públicamente, por lo que cualquier persona puede unirse a contribuir en cualquier momento.'
        }
    ];

    const handleNext = (e) => {
        e.preventDefault();

        if (projectType === "Personal") {
            navigate('/nueva-convocatoria/personal');
        } else if (projectType === "Open-source") {
            navigate('/nueva-convocatoria/open-source');
        } else {
            console.log("Selecciona un tipo para continuar") //Mostrárselo al usuario
        }
    }

    return (
        <main>
            <div className="container">
                <section className="new-project-page">

                    <h1 className="title-40 new-project-page__title">Crear convocatoria para un proyecto</h1>

                    <form className="new-project-page__form">
                        <div className="new-project-page__type">
                            <div className="new-project-page__type__title">
                                <h2 className="title-20 medium-text">Tipo de proyecto</h2>
                                <p className="paragraph-18">Elige el tipo de proyecto para el que comenzarás a buscar colaboradores.</p>
                            </div>

                            <div className="onboarding-input-container">
                                {typeOptions.map((type) => (
                                    <OnboardingCheckboxWithDescription
                                        key={type.id}
                                        id={type.id}
                                        svg={type.svg}
                                        title={type.title}
                                        description={type.description}
                                        isChecked={projectType === type.title}
                                        onChange={() => setProjectType(type.title)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="new-project-page__actions">
                            <Button size="large" width="full-then-fit" onClick={handleNext}>Siguiente</Button>
                        </div>
                    </form>

                </section>
            </div>
        </main>
    )
}

export default NewProjectPage;