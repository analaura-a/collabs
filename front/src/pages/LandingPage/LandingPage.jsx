import ArrowIcon from '../../assets/svg/arrow-right.svg?react';
import Button from '../../components/Button/Button';

const LandingPage = () => {

    return (
        <main className="landing-page">

            <section className="container hero-section">
                <div className="hero-section__info">

                    <div className="hero-section__heading">
                        <div className="hero-section__title">
                            <h1>Crece profesionalmente</h1>
                            <h1 className="title-with-faces">junto a <span><img src="assets/svg/faces.svg" alt="Colaboradores" /></span> otros</h1>
                        </div>

                        <p className='big-subtitle'>En Collabs podrás buscar proyectos, unirte a colaborar, ganar experiencia, hacer conexiones y avanzar en tu carrera.</p>
                    </div>

                    <div className="hero-section__buttons">
                        <Button color="secondary" width="full-then-fit">Cómo funciona</Button>
                        <Button width="full-then-fit" icon={<ArrowIcon />}>Empezar a colaborar</Button>
                    </div>

                </div>

                <div className="hero-section__photo">
                    <img src="assets/png/collabs-mockup.png" alt="Pantallas principales de Collabs" />
                </div>
            </section>


            <section id="que-es" className="container about-section">
                <div className="about-section__text-column">
                    <div className="about-section__text-column__title-and-text">
                        <div className="about-section__text-column__title">
                            <p className="landing-page-subtitle">Acerca de</p>
                            <h2 className="title-40">¿Qué es Collabs?</h2>
                        </div>

                        <div className="about-section__text-column__text">
                            <p className="paragraph-18">Collabs es una <span className="medium-text">plataforma de difusión y organización de proyectos colaborativos</span>, diseñada específicamente para personas del <span className="primary-color-text medium-text">rubro IT</span>.</p>
                            <p className="paragraph-18">En este espacio, profesionales de todos los niveles de experiencia pueden reclutar a voluntarios y trabajar en proyectos de todo tipo durante su tiempo libre, con el objetivo de crecer profesionalmente junto a colegas del rubro.</p>
                        </div>
                    </div>

                    <div className="about-section__text-column__project-types">
                        <h3 className="title-20 medium-text">Tipo de proyectos</h3>

                        <div className="about-section__text-column__project-types__cards">
                            <div>
                                <img src="../assets/svg/landing-personal-projects.svg" alt="" />
                                <p className="paragraph-18">Personales</p>
                            </div>

                            <div>
                                <img src="../assets/svg/landing-open-source-projects.svg" alt="" />
                                <p className="paragraph-18">Open-source</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section__image-column">
                    <img src="../assets/svg/collaborators-circle.svg" alt="Círculo de colaboradores" />
                </div>
            </section>

            {/*   <section id="como-funciona">
                <h1>Cómo funciona</h1>
            </section>

            <section id="funcionalidades">
                <h1>Funcionalidades</h1>
            </section> */}

        </main>
    )
}

export default LandingPage;