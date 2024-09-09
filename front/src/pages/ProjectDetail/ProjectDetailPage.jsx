import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import PositionAccordion from "../../components/Accordion/PositionAccordion";

const ProjectDetailPage = () => {

    return (
        <main>
            <div className="container project-detail-page">

                <Link to={"/explorar/proyectos"} className="small-button-with-icon arrow-left"></Link>

                <div className="project-detail-page__columns">
                    <section className="project-detail-page__about-column">

                        <div className="project-detail-page__about-column__header">
                            <div className="project-detail-page__about-column__title">
                                <h1 className="title-48">Web para adoptar mascotas</h1>

                                <div className="project-detail-page__about-column__dates">
                                    <div>
                                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                                        <p className="subtitle-18">Publicado el 19/10/2023</p>
                                    </div>

                                    <div>
                                        <img src="../assets/svg/clock.svg" alt="Reloj" />
                                        <p className="subtitle-18">Cierra convocatoria el 31/10/2023</p>
                                    </div>
                                </div>
                            </div>

                            <div className="project-detail-page__about-column__img">
                                <img src="https://images.pexels.com/photos/25568845/pexels-photo-25568845/free-photo-of-hombre-pareja-mujer-en-pie.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Imagen de portada del proyecto" />
                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-about">
                            <h2 className="title-20">Acerca del proyecto</h2>
                            <div>
                                <p className="paragraph-18">La Cuentoneta es un proyecto que busca generar un espacio comunitario para difundir escritos en literatura breve. Esta iniciativa fue gestada originalmente por un grupo de amigas y amigos residentes de la ciudad de Santa Fe, Argentina durante los últimos días de diciembre de 2021. La misión de La Cuentoneta es construir colectivamente una plataforma accesible, amigable y gamificada que sea útil para fomentar, compartir y disfrutar la lectura digital. Buscamos lograrlo a través de la publicación de escritos breves en storylists temáticas, emulando las playlists que utilizan plataformas de audio como Spotify y de video como YouTube; intentando resignificar el formato de antología de relatos breves.</p>
                                <p className="paragraph bolder-text primary-color-text">Leer más</p>
                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-details">
                            <h2 className="title-20">Detalles del proyecto</h2>

                            <div className="project-detail-page__about-column__project-info-details__pills">

                                <div>
                                    <div className="project-detail-page__icon-container types-icon"></div>
                                    <div>
                                        <p className="smaller-paragraph-light">Tipo</p>
                                        <p className="paragraph-18">Personal</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="project-detail-page__icon-container availability-icon"></div>
                                    <div>
                                        <p className="smaller-paragraph-light">Disponibilidad requerida</p>
                                        <p className="paragraph-18">De 1 a 2 horas / día</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-positions">
                            <h2 className="title-20">Colaboradores buscados</h2>

                            <div className="project-detail-page__about-column__project-info-positions__accordion-container">

                                <PositionAccordion
                                    positionTitle="Frontend Developer"
                                    requiredSkills={["HTML", "CSS", "JavaScript", "React.js", "Vue.js", "Angular"]}
                                    desiredSkills={["Vite", "GSAP"]}
                                />

                                <PositionAccordion
                                    positionTitle="Backend Developer"
                                    requiredSkills={["HTML", "CSS", "JavaScript", "React.js", "Vue.js", "Angular"]}
                                    desiredSkills={["Vite", "GSAP"]}
                                />

                            </div>
                        </div>

                    </section>



                    <section className="project-detail-page__join-column">

                        <div className="project-detail-page__join-column__blocks project-detail-page__join-column__status-and-positions">

                            <div className="project-detail-page__status">
                                <h2 className="title-20">Estado</h2>

                                <div className="project-detail-page__status__cta">
                                    <p className="subtitle bold-text status-green">Buscando colaboradores</p>
                                    <button className="small-button-with-icon link-icon"></button>
                                </div>
                            </div>

                            <div className="project-detail-page__positions">
                                <h2 className="title-20">Quiero colaborar como...</h2>

                                {/* <ul className="project-detail-page__positions__open-source">
                                    <li className="subtitle">UX/UI Designer</li>
                                    <li className="subtitle">UX/UI Designer</li>
                                    <li className="subtitle">UX/UI Designer</li>
                                </ul>

                                <Button width="fullwidth" size="large">Quiero contribuir</Button> */}

                                <form className="edit-profile-page__form-container__inputs-container">

                                    <div className="checkbox-item">

                                        <input
                                            type="radio"
                                            name="experience_level"
                                            id="1"
                                            className="hidden-input"
                                        />

                                        <label htmlFor="1">
                                            UX/UI Designer
                                        </label>

                                    </div>

                                    <div className="checkbox-item">

                                        <input
                                            type="radio"
                                            name="experience_level"
                                            id="1"
                                            className="hidden-input"
                                        />

                                        <label htmlFor="1">
                                            Frontend Developer
                                        </label>

                                    </div>

                                    <div className="checkbox-item checkbox-item-checked">

                                        <input
                                            type="radio"
                                            name="experience_level"
                                            id="1"
                                            className="hidden-input"
                                        />

                                        <label htmlFor="1">
                                            Backend developer
                                        </label>

                                    </div>

                                </form>

                                <Button width="fullwidth" size="large">Postularme</Button>

                            </div>


                        </div>

                        <div className="project-detail-page__join-column__blocks project-detail-page__join-column__hosts">
                            <h2 className="title-20">Organizado por</h2>

                            <Link to={"/explorar/proyectos"} className="project-detail-page__join-column__profile">
                                <div className="project-detail-page__join-column__profile__img">
                                    <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="" />
                                </div>
                                <div>
                                    <h3 className="subtitle bold-text black-color-text">Manuel Pérez</h3>
                                    <p className="smaller-paragraph-light">Buenos Aires, Argentina</p>
                                </div>
                            </Link>
                        </div>

                        <div className="project-detail-page__join-column__blocks project-detail-page__join-column__call-to-action">
                            <div>
                                <h2 className="title-20">¿Buscando colaboradores para tu próximo proyecto personal?</h2>
                                <p className="light-paragraph">Publica una nueva convocatoria, selecciona candidatos y forma un equipo para tu proyecto.</p>
                            </div>
                            <Button width="fullwidth" size="large">Crear convocatoria</Button>
                        </div>

                    </section>
                </div>

            </div>
        </main>
    )
}

export default ProjectDetailPage;