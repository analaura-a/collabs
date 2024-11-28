import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getRecentProjects } from "../../services/projectService";
import { useToast } from "../../context/ToastContext";
import ArrowIcon from '../../assets/svg/arrow-right.svg?react';
import Button from '../../components/Button/Button';
import ProjectCard from "../../components/Cards/ProjectCard";
import Loader from "../../components/Loader/Loader";

const LandingPage = () => {

    const navigate = useNavigate();
    const { addToast } = useToast();

    // Funcionalidad del toggle 
    const [activeTab, setActiveTab] = useState("Personales");

    const cardsData = {
        "Personales": [
            {
                number: "1",
                title: "Abre una nueva convocatoria",
                text: "Añade los detalles del proyecto y todos los perfiles profesionales que estás buscando que se sumen a colaborar.",
                imgSrc: "../assets/png/personal-card-1.png",
                imgAlt: "Agregar un colaborador",
            },
            {
                number: "2",
                title: "Define tu equipo ideal",
                text: "Revisa las postulaciones y añade al equipo a aquellos candidatos que creas podrían ser un buen fit para el proyecto.",
                imgSrc: "../assets/png/personal-card-2.png",
                imgAlt: "Revisión de postulaciones",
            },
            {
                number: "3",
                title: "Lleva a cabo el proyecto",
                text: "Comunícate con tus compañeros, añade atajos a links importantes para todo el equipo y lleven adelante el proyecto.",
                imgSrc: "../assets/png/personal-card-3.png",
                imgAlt: "Mensajes de chat",
            },
        ],
        "Open-source": [
            {
                number: "1",
                title: "Abre una nueva convocatoria",
                text: "Añade los detalles del proyecto y todos los perfiles profesionales que te gustaría que se sumen a contribuir en él.",
                imgSrc: "../assets/png/personal-card-1.png",
                imgAlt: "Agregar un colaborador",
            },
            {
                number: "2",
                title: "Redirige al repositorio",
                text: "Guía a los interesados en contribuir al repositorio del proyecto, donde podrán encontrar la información necesaria sobre cómo colaborar (desde su respectivo rol).",
                imgSrc: "../assets/png/open-source-card-2.png",
                imgAlt: "Link al repositorio del proyecto",
            },
            {
                number: "3",
                title: "Lleva a cabo el proyecto",
                text: "¡Listo! Una vez que el proyecto termine, podrás cambiar su estado y cerrar la convocatoria. Si en algún momento vuelves a necesitar colaboradores, podrás reabrirla.",
                imgSrc: "../assets/png/open-source-card-3.png",
                imgAlt: "Cambiar estado a finalizado",
            },
        ],
    };

    // Funcionalidad de los proyectos recientes
    const [recentProjects, setRecentProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentProjects = async () => {
            try {
                const projects = await getRecentProjects();
                setRecentProjects(projects);
            } catch (error) {
                addToast({
                    type: 'error',
                    title: 'Error al cargar los últimos proyectos',
                    message: 'Ocurrió un error desconocido al intentar cargar los últimos proyectos. Inténtalo de nuevo más tarde.'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchRecentProjects();
    }, []);

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
                        <Button color="secondary" width="full-then-fit" onClick={() => navigate('/#como-funciona')}>Cómo funciona</Button>
                        <Button width="full-then-fit" icon={<ArrowIcon />} onClick={() => navigate('/auth/crear-cuenta')}>Empezar a colaborar</Button>
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

            <section id="como-funciona" className="container how-it-works-section">
                <div className="how-it-works-section__title-with-buttons">
                    <div className="how-it-works-section__title">
                        <p className="landing-page-subtitle">Sobre la plataforma</p>
                        <h2 className="title-40">¿Cómo funciona?</h2>
                    </div>

                    <div className="how-it-works-section___toggle">
                        <p className={`light-paragraph ${activeTab === "Personales" ? "toggle-active" : ""}`} onClick={() => setActiveTab("Personales")}>Personales</p>
                        <p className={`light-paragraph ${activeTab === "Open-source" ? "toggle-active" : ""}`} onClick={() => setActiveTab("Open-source")}>Open-source</p>
                    </div>
                </div>

                <div className="how-it-works-section__cards">

                    {cardsData[activeTab].map((card) => (
                        <div className="how-it-works-section__card" key={card.number}>
                            <div className="title-20 how-it-works-section__card__number">{card.number}</div>

                            <div className="how-it-works-section__card__text">
                                <h3 className="title-20 medium-text">{card.title}</h3>
                                <p className="light-paragraph">{card.text}</p>
                            </div>

                            <div className="how-it-works-section__card__img">
                                <img src={card.imgSrc} alt={card.imgAlt} />
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            <section id="funcionalidades" className="container features-section">
                <div className="features-section__title-with-text">
                    <div className="features-section__title">
                        <p className="landing-page-subtitle">Funcionalidades</p>
                        <h2 className="title-40">El arte de colaborar</h2>
                    </div>

                    <p className="subtitle-18">Conoce por qué Collabs es la mejor plataforma para organizar proyectos colaborativos en el rubro.</p>
                </div>

                <div className="features-section__features-cards">

                    <div className="features-section__features-card-left">
                        <div className="features-section__features-card__info">
                            <h3 className="title-24">Encuentra proyectos (y colaboradores) ideales para ti</h3>
                            <p className="light-paragraph">Usa los filtros para encontrar oportunidades de colaboración que sean de tu interés. Ya sean personales u open-source, hay proyectos de todo tipo y para todos los niveles de experiencia. </p>
                        </div>

                        <div className="how-it-works-section__card__img">
                            <img src="../assets/png/feature-card-1.png" alt="Página de explorar oportunidades de colaboración" />
                        </div>
                    </div>

                    <div className="features-section__features-cards-right">

                        <div className="features-section__features-cards-right__card">
                            <div className="features-section__features-card__info">
                                <h3 className="title-24">Facilita el onboarding a nuevos compañeros</h3>
                                <p className="light-paragraph">Usa herramientas como el chat y los atajos rápidos para que todo el equipo pueda estar en una misma sintonía, sin importar en qué momento del proyecto se unan.</p>
                            </div>

                            <div className="how-it-works-section__card__img">
                                <img src="../assets/png/feature-card-2.png" alt="Agregar atajo rápido" />
                            </div>
                        </div>

                        <div className="features-section__features-cards-right__card">
                            <div className="features-section__features-card__info">
                                <h3 className="title-24">Da forma a un equipo en el que puedas confiar</h3>
                                <p className="light-paragraph">Con ayuda de las estadísticas y las reseñas en el perfil de cada usuario, siente la tranquilidad de elegir a colegas en los que puedas confiar al momento de definir el equipo del proyecto.</p>
                            </div>

                            <div className="how-it-works-section__card__img">
                                <img src="../assets/png/feature-card-3.png" alt="Estadísticas de colaboración" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="container recent-projects-section">
                <div className="recent-projects-section__title-with-text">
                    <div className="recent-projects-section__title">
                        <p className="landing-page-subtitle">Lo más reciente</p>
                        <h2 className="title-40">Convocatorias abiertas</h2>
                    </div>

                    <p className="subtitle-18">Explora algunas de las oportunidades de colaboración que se abrieron recientemente.</p>
                </div>

                {loading ? (
                    <Loader size="small" />
                ) : recentProjects.length > 0 ? (
                    <div className="explore-page__container-user-cards">

                        {recentProjects.map((project) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                            />
                        ))}

                    </div>
                ) : (
                    <p className="subtitle-18">No hay proyectos recientes disponibles.</p>
                )}
            </section>

            <section className="container footer-cta-section">
                <div className="footer-cta-section__cta">
                    <h2 className="title-40">Da el próximo paso en tu carrera, <span className="primary-color-text">junto a otros</span></h2>
                    <Button width="full-then-fit" size="large" icon={<ArrowIcon />} onClick={() => navigate('/auth/crear-cuenta')}>Empezar a colaborar</Button>
                </div>

                <div className="footer-cta-section__img how-it-works-section__card__img">
                    <img src="../assets/png/collaborators-shining.png" alt="Página de explorar oportunidades de colaboración" />
                </div>
            </section>

        </main>
    )
}

export default LandingPage;