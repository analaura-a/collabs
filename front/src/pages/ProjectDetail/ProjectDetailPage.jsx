import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; //Para que, si es un proyecto creado por el usuario, redirigirlo al dashboard
import { getProjectById } from "../../services/projectService";
import { createRequest } from "../../services/requestService";
import Button from "../../components/Button/Button";
import PositionAccordion from "../../components/Accordion/PositionAccordion";

const ProjectDetailPage = () => {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 500;

    const fetchProject = async () => {
        try {
            const projectData = await getProjectById(id);
            setProject(projectData);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el proyecto:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProject();
    }, [id]);

    const handleCopyLink = () => {
        const projectUrl = window.location.href;
        navigator.clipboard.writeText(projectUrl)
            .then(() => {
                console.log("Copiado con éxito") // Mostrar al usuario
            })
            .catch(err => {
                console.error('Error al copiar el enlace: ', err); // Mostrar al usuario
            });
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleApplicationSubmit = async () => {

        if (!selectedPosition) {
            console.log('Por favor selecciona un rol para postularte.');
            return;
        }

        // // Buscar el "profile" de la posición seleccionada
        // const selectedPositionObj = project.open_positions.find(
        //     (position) => position._id === selectedPosition
        // );

        // if (!selectedPositionObj) {
        //     console.log('Posición seleccionada no encontrada.');
        //     return;
        // }

        // const appliedRole = selectedPositionObj.profile;

        // try {
        //     await createRequest({
        //         userId: user._id,
        //         projectId: project._id,
        //         appliedRole,
        //         openPositionId: selectedPosition,  // selectedPosition ahora contiene el openPositionId
        //     });

        //     console.log('¡Te has postulado con éxito!');
        // } catch (error) {
        //     if (error.response && error.response.status === 409) {
        //         console.log('Ya te has postulado para esta posición.');
        //     } else {
        //         console.log('Ocurrió un error al enviar la postulación. Inténtalo de nuevo más tarde.');
        //     }
        // }
    };


    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <main>
            <div className="container project-detail-page">

                <Link to={"/explorar/proyectos"} className="small-button-with-icon arrow-left"></Link>

                <div className="project-detail-page__columns">
                    <section className="project-detail-page__about-column">

                        <div className="project-detail-page__about-column__header">
                            <div className="project-detail-page__about-column__title">
                                <h1 className="title-48">{project.name}</h1>

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
                                <p className="paragraph-18">
                                    {project.about.length > maxLength && !isExpanded ? `${project.about.slice(0, maxLength)}...` : project.about}
                                </p>

                                {project.about.length > maxLength && (
                                    <button className="paragraph bolder-text primary-color-text read-more" onClick={toggleReadMore}>
                                        {isExpanded ? 'Leer menos' : 'Leer más'}
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-details">
                            <h2 className="title-20">Detalles del proyecto</h2>

                            <div className="project-detail-page__about-column__project-info-details__pills">

                                <div>
                                    <div className="project-detail-page__icon-container types-icon"></div>

                                    {project.type == "Personal" ? (
                                        <div>
                                            <p className="smaller-paragraph-light">Tipo</p>
                                            <p className="paragraph-18">Personal</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="smaller-paragraph-light">Tipo</p>
                                            <p className="paragraph-18">Open source</p>
                                        </div>
                                    )}
                                </div>

                                {project.required_availability &&
                                    <div>
                                        <div className="project-detail-page__icon-container availability-icon"></div>
                                        <div>
                                            <p className="smaller-paragraph-light">Disponibilidad requerida</p>
                                            <p className="paragraph-18">{project.required_availability}</p>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-positions">
                            <h2 className="title-20">Colaboradores buscados</h2>

                            <div className="project-detail-page__about-column__project-info-positions__accordion-container">
                                {project.open_positions.map((position, index) => (
                                    <PositionAccordion
                                        key={index}
                                        positionTitle={position.profile}
                                        requiredSkills={position.required_skills}
                                        desiredSkills={position.desired_skills}
                                    />
                                ))}
                            </div>
                        </div>

                    </section>

                    <section className="project-detail-page__join-column">

                        <div className="project-detail-page__join-column__blocks project-detail-page__join-column__status-and-positions">

                            <div className="project-detail-page__status">
                                <h2 className="title-20">Estado</h2>

                                {/* Mostrar dinámicamente */}
                                <div className="project-detail-page__status__cta">
                                    <p className="subtitle bold-text status-green">Buscando colaboradores</p>
                                    <button className="small-button-with-icon link-icon" onClick={handleCopyLink}></button>
                                </div>
                            </div>

                            <div className="project-detail-page__positions">

                                {project.type == "Personal" ? (
                                    <>
                                        <h2 className="title-20">Quiero colaborar como...</h2>

                                        <form className="edit-profile-page__form-container__inputs-container">

                                            {/* Cambiar index por position.open_position_id */}
                                            {project.open_positions.map((position, index) => (
                                                <div key={index} className={`checkbox-item ${selectedPosition === position ? 'checkbox-item-checked' : ''}`} onClick={() => setSelectedPosition(position)}>

                                                    <input
                                                        type="radio"
                                                        name="open_position"
                                                        id={index}
                                                        value={position.profile}
                                                        checked={selectedPosition === position.profile}
                                                        onChange={(e) => e.stopPropagation()}
                                                        className="hidden-input"
                                                    />

                                                    <label htmlFor={index} className="subtitle bold-text">
                                                        {position.profile}
                                                    </label>

                                                </div>
                                            ))}

                                        </form>

                                        <Button width="fullwidth" size="large" onClick={handleApplicationSubmit}>Postularme</Button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="title-20">Colaboradores buscados</h2>

                                        <ul className="project-detail-page__positions__open-source">

                                            {/* Cambiar index por position.open_position_id */}
                                            {project.open_positions.map((position, index) => (
                                                <li key={index} className="subtitle">{position.profile}</li>
                                            ))}

                                        </ul>

                                        <Button width="fullwidth" size="large">Quiero contribuir</Button>
                                    </>
                                )}

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

                            {project.type == "Personal" ? (
                                <>
                                    <div>
                                        <h2 className="title-20">¿Buscando colaboradores para tu próximo proyecto?</h2>
                                        <p className="light-paragraph">Publica una nueva convocatoria, selecciona candidatos y forma un equipo para tu proyecto.</p>
                                    </div>
                                    <Button width="fullwidth" size="large">Crear convocatoria</Button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h2 className="title-20">¿Buscando colaboradores para tu próximo proyecto?</h2>
                                        <p className="light-paragraph">Publica una nueva convocatoria y conduce a las personas interesadas en contribuir a tu repositorio.</p>
                                    </div>
                                    <Button width="fullwidth" size="large">Crear convocatoria</Button>
                                </>
                            )}

                        </div>

                    </section>
                </div>

            </div>
        </main>
    )
}

export default ProjectDetailPage;