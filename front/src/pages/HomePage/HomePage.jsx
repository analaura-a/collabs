import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Button from "../../components/Button/Button";
import ProjectCard from "../../components/Cards/ProjectCard";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const HomePage = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/editar-perfil', { state: { section: 'professional-profile' } });
    };

    return (
        <main>
            <div className="container home-page">

                <section className="home-page__overview">

                    <div className="home-page__overview__projects-column">

                        <div className="home-page__overview__projects-column__header">
                            <div className="home-page__overview__projects-column__header__title">
                                <h1 className="title-48">Hola, {user.name}</h1>
                                <p className="title-20 black-light-color-text">¿En qué proyecto vas a colaborar hoy?</p>
                            </div>

                            <div className="home-page__overview__projects-column__header__project-numbers">
                                <div className="home-page__overview__projects-column__header__project-number-card">
                                    <img src="../assets/svg/personal-projects.svg" alt="Postulaciones" />

                                    <div>
                                        <p className="title-40 regular-text primary-color-text">2</p>
                                        <p className="subtitle-18 medium-text black-color-text">Proyectos personales</p>
                                    </div>
                                </div>

                                <div className="home-page__overview__projects-column__header__project-number-card">
                                    <img src="../assets/svg/open-source-projects.svg" alt="Postulaciones" />

                                    <div>
                                        <p className="title-40 regular-text placeholder-color-text">0</p>
                                        <p className="subtitle-18 medium-text black-color-text">Proyectos open-source</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="home-page__overview__projects-column__my-projects">
                            <div className="title-with-icon-and-paragraph">
                                <div className="title-with-icon">
                                    <img src="../assets/svg/my-projects.svg" alt="Proyecto" />
                                    <h2 className="title-20 medium-text">Mis proyectos</h2>
                                </div>

                                <p className="light-paragraph">Proyectos en los que estuviste colaborando recientemente.</p>
                            </div>

                            <div className="home-page__overview__projects-column__my-projects-with-cta">
                                <div className="home-page__overview__projects-column__my-projects__card-container">
                                    <Link to="/mis-proyectos" className="home-page__overview__projects-column__my-projects__card">
                                        <p className="subtitle-18 medium-text subtitle-color-text">Web para adoptar mascotas</p>
                                        <img src="../assets/svg/extern-link.svg" />
                                    </Link>

                                    <Link to="/mis-proyectos" className="home-page__overview__projects-column__my-projects__card">
                                        <p className="subtitle-18 medium-text subtitle-color-text">Hackaton SummerFest</p>
                                        <img src="../assets/svg/extern-link.svg" />
                                    </Link>
                                </div>

                                <Link to="/mis-proyectos" className="subtitle link">Ver todos</Link>
                            </div>
                        </div>

                    </div>

                    <div className="home-page__overview__cta-column">

                        <div className="cta-container home-page__overview__cta-column__profile">
                            <div className="home-page__overview__cta-column__profile__user-info">
                                {user.profile_pic ? (
                                    <div className="home-page__profile-photo">
                                        <img src={`${SERVER_BASE_URL}${user.profile_pic}`} alt={`Foto de perfil de ${user.name}`} />
                                    </div>
                                ) : (
                                    <div className="home-page__profile-photo">
                                        <img src="../assets/jpg/no-profile-picture.jpg" alt={`Foto de perfil de ${user.name}`} />
                                    </div>
                                )}

                                <div>
                                    <h3 className="subtitle bold-text black-color-text">{user.name} {user.last_name}</h3>
                                    {user.location ? (
                                        <p className="smaller-paragraph-light">{user.location}</p>
                                    ) : (
                                        <p className="smaller-paragraph-light">Sin ubicación agregada</p>
                                    )}
                                </div>
                            </div>

                            <div className="home-page__overview__cta-column__profile__roles">
                                <h2 className="title-24">Me gustaría colaborar como...</h2>
                                <ul>
                                    {user.roles.map((role) => (
                                        <li key={role} className="subtitle clasic-pill">
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button width="fullwidth" size="large" onClick={handleEditProfile}>Actualizar perfil profesional</Button>
                        </div>

                        <div className="cta-container home-page__overview__cta-column__new-project">
                            <div className="vertical-space-4">
                                <h2 className="title-24">¿Buscando colaboradores?</h2>
                                <p className="light-paragraph">Publica una nueva convocatoria, selecciona candidatos y forma un equipo para tu proyecto.</p>
                            </div>

                            <Button width="fullwidth" size="large" onClick={() => navigate('/nueva-convocatoria')}>Crear convocatoria</Button>
                        </div>
                    </div>
                </section>

                <section className="home-page__explore">
                    <div className="title-with-icon-and-paragraph">
                        <div className="title-with-icon">
                            <img src="../assets/svg/projects.svg" alt="Proyectos" />
                            <h2 className="title-20 medium-text">Explora estas oportunidades de colaboración</h2>
                        </div>

                        <p className="light-paragraph">Recomendaciones basadas en tus preferencias y en tu perfil profesional.</p>
                    </div>

                    <div className="explore-page__container-user-cards">
                        {/* Cards  */}
                    </div>
                </section>

            </div>
        </main>
    )
}

export default HomePage;