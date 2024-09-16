import Button from "../../components/Button/Button";

const NewProjectPage = () => {

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

                                {/* Reemplazar por los componentes OnboardingCheckboxWithDescription */}

                                <div className="onboarding-input-box-with-description">
                                    <input
                                        type="checkbox"
                                        id="type-1"
                                        name="select-type"
                                        value="Personal"
                                        className="hidden-input"
                                    />

                                    <img src="../../assets/svg/personal-project.svg" alt="Personal" />

                                    <div className="onboarding-input-box__text-container">
                                        <label htmlFor="type-1">
                                            Personal
                                        </label>

                                        <p>Los proyectos personales (“cerrados”) son aquellos en los que solo el equipo de personas trabajando en él puede acceder y colaborar activamente en su realización.</p>
                                    </div>
                                </div>

                                <div className="onboarding-input-box-with-description">
                                    <input
                                        type="checkbox"
                                        id="type-2"
                                        name="select-type"
                                        value="Open-source"
                                        className="hidden-input"
                                    />

                                    <img src="../../assets/svg/open-source-project.svg" alt="Open-source" />

                                    <div className="onboarding-input-box__text-container">
                                        <label htmlFor="type-1">
                                            Open-source
                                        </label>

                                        <p>Los proyectos open-source son aquellos en los que su diseño y desarrollo son compartidos públicamente, por lo que cualquier persona puede unirse a contribuir en cualquier momento.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="new-project-page__actions">
                            <Button size="large" width="full-then-fit">Siguiente</Button>
                        </div>
                    </form>

                </section>
            </div>
        </main>
    )
}

export default NewProjectPage;