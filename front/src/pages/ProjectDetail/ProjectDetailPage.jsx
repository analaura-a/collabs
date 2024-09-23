import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; //Para verificar que, si el usuario ya está en el equipo del proyecto, este no pueda postularse
import { getProjectById } from "../../services/projectService";
import { getProjectOrganizers } from "../../services/teamService";
import { createRequest } from "../../services/requestService";
import Button from "../../components/Button/Button";
import PositionAccordion from "../../components/Accordion/PositionAccordion";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectDetailPage = () => {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [organizers, setOrganizers] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState(null);

    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 500;

    const navigate = useNavigate();

    const fetchProject = async () => {
        try {
            // Obtener los detalles del proyecto
            const projectData = await getProjectById(id);
            setProject(projectData);

            // Obtener los organizadores del proyecto
            const projectOrganizers = await getProjectOrganizers(id);
            setOrganizers(projectOrganizers);

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

    const handleExternalRedirect = (url) => {
        const externalUrl = url.startsWith('https://') ? url : `https://${url}`;
        window.open(externalUrl, '_blank');
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
                                <img src={project.cover ? `${SERVER_BASE_URL}${project.cover}` : "../assets/jpg/no-project-picture.jpg"} alt={`Portada del proyecto ${project.name}`} />
                            </div>
                        </div>

                        <div className="project-detail-page__about-column__project-info-about">
                            <h2 className="title-24">Acerca del proyecto</h2>
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
                            <h2 className="title-24">Detalles del proyecto</h2>

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
                            <h2 className="title-24">Colaboradores buscados</h2>

                            <div className="project-detail-page__about-column__project-info-positions__accordion-container">
                                {project.open_positions.map((position) => (
                                    <PositionAccordion
                                        key={position._id}
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
                                <h2 className="title-24">Estado</h2>

                                {/* Mostrar dinámicamente */}
                                <div className="project-detail-page__status__cta">
                                    <p className="subtitle bold-text status-green">Buscando colaboradores</p>
                                    <button className="small-button-with-icon link-icon" onClick={handleCopyLink}></button>
                                </div>
                            </div>

                            <div className="project-detail-page__positions">

                                {project.type == "Personal" ? (
                                    <>
                                        <h2 className="title-24">Quiero colaborar como...</h2>

                                        <form className="edit-profile-page__form-container__inputs-container">

                                            {project.open_positions.map((position) => (
                                                <div key={position._id} className={`checkbox-item ${selectedPosition === position ? 'checkbox-item-checked' : ''}`} onClick={() => setSelectedPosition(position)}>

                                                    <input
                                                        type="radio"
                                                        name="open_position"
                                                        id={position._id}
                                                        value={position._id}
                                                        checked={selectedPosition === position._id}
                                                        onChange={(e) => e.stopPropagation()}
                                                        className="hidden-input"
                                                    />

                                                    <label htmlFor={position._id} className="subtitle bold-text">
                                                        {position.profile}
                                                    </label>

                                                </div>
                                            ))}

                                        </form>

                                        <Button width="fullwidth" size="large" onClick={handleApplicationSubmit}>Postularme</Button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="title-24">Colaboradores buscados</h2>

                                        <ul className="project-detail-page__positions__open-source">

                                            {project.open_positions.map((position) => (
                                                <li key={position._id} className="subtitle">{position.profile}</li>
                                            ))}

                                        </ul>

                                        <Button width="fullwidth" size="large" onClick={() => handleExternalRedirect(project.url)}>Quiero contribuir</Button>
                                    </>
                                )}

                            </div>

                        </div>

                        {organizers.length > 0 &&
                            <div className="project-detail-page__join-column__blocks project-detail-page__join-column__hosts">
                                <h2 className="title-24">Organizado por</h2>

                                {organizers.map((organizer) => (
                                    <Link to={`/colaboradores/${organizer.username}`} key={organizer.user_id} className="project-detail-page__join-column__profile">
                                        <div className="project-detail-page__join-column__profile__img">
                                            <img src={organizer.profile_pic ? `${SERVER_BASE_URL}${organizer.profile_pic}` : "../assets/jpg/no-profile-picture.jpg"} alt={`Foto de perfil de ${organizer.name}`} />
                                        </div>
                                        <div>
                                            <h3 className="subtitle bold-text black-color-text">{organizer.name} {organizer.last_name}</h3>
                                            {organizer.location && <p className="smaller-paragraph-light">Buenos Aires, Argentina</p>}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        }

                        <div className="project-detail-page__join-column__blocks project-detail-page__join-column__call-to-action">

                            {project.type == "Personal" ? (
                                <>
                                    <div>
                                        <h2 className="title-24">¿Buscando colaboradores para tu próximo proyecto?</h2>
                                        <p className="light-paragraph">Publica una nueva convocatoria, selecciona candidatos y forma un equipo para tu proyecto.</p>
                                    </div>
                                    <Button width="fullwidth" size="large" onClick={() => navigate('/nueva-convocatoria')}>Crear convocatoria</Button>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h2 className="title-24">¿Buscando colaboradores para tu próximo proyecto?</h2>
                                        <p className="light-paragraph">Publica una nueva convocatoria y conduce a las personas interesadas en contribuir a tu repositorio.</p>
                                    </div>
                                    <Button width="fullwidth" size="large" onClick={() => navigate('/nueva-convocatoria')}>Crear convocatoria</Button>
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