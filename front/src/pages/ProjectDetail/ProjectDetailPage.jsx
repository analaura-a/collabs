import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext"; //Para verificar que, si el usuario ya está en el equipo del proyecto, este no pueda postularse
import { getProjectById } from "../../services/projectService";
import { getProjectOrganizers, checkUserInProjectTeam } from "../../services/teamService";
import { createRequest } from "../../services/requestService";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import Textarea from "../../components/Inputs/Textarea";
import PositionAccordion from "../../components/Accordion/PositionAccordion";

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectDetailPage = () => {

    const { id } = useParams();

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [isUserInTeam, setIsUserInTeam] = useState(false);

    const [project, setProject] = useState(null);
    const [organizers, setOrganizers] = useState([]);

    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [selectedPositionProfile, setSelectedPositionProfile] = useState(null);
    const [applicationMessage, setApplicationMessage] = useState('');

    const [loading, setLoading] = useState(true);

    const [isModalOpen, setModalOpen] = useState(false);

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

            // Verificar si el usuario ya está en el equipo del proyecto
            const userInTeam = await checkUserInProjectTeam(id, user._id);
            setIsUserInTeam(userInTeam);

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

    const handleOpenModal = () => {

        // Verificar si hay una posición seleccionada
        if (!selectedPositionId) {
            console.log('Por favor selecciona un rol para postularte.'); //Mostrar al usuario
            return;
        }

        setModalOpen(true)
    }

    const handleCloseModal = () => setModalOpen(false);

    const handleApplicationSubmit = async () => {

        if (!selectedPositionId || !selectedPositionProfile) {
            handleCloseModal();
            console.log('Por favor selecciona un rol para postularte.'); //Mostrar al usuario
            return;
        }

        // Crear la postulación
        try {
            await createRequest({
                userId: user._id,
                projectId: project._id,
                appliedRole: selectedPositionProfile,
                openPositionId: selectedPositionId,
                message: applicationMessage
            });

            console.log('¡Te has postulado con éxito!'); //Mostrar al usuario
        } catch (error) {
            if (error.message === '409') {
                console.log('Ya te has postulado para esta posición.'); //Mostrar al usuario
            } else {
                console.log('Ocurrió un error al enviar la postulación. Inténtalo de nuevo más tarde.'); //Mostrar al usuario
            }
        }

        handleCloseModal();
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
                                {
                                    project.type == "Personal" ? (
                                        <>
                                            <h2 className="title-24">Quiero colaborar como...</h2>

                                            <form className="edit-profile-page__form-container__inputs-container">
                                                {project.open_positions.map((position) => (
                                                    <div key={position._id} className={`checkbox-item ${selectedPositionId === position._id ? 'checkbox-item-checked' : ''}`} onClick={() => { setSelectedPositionId(position._id); setSelectedPositionProfile(position.profile) }}>

                                                        <input
                                                            type="radio"
                                                            name="open_position"
                                                            id={position._id}
                                                            value={position._id}
                                                            checked={selectedPositionId === position._id}
                                                            onChange={(e) => e.stopPropagation()}
                                                            className="hidden-input"
                                                        />

                                                        <label htmlFor={position._id} className="subtitle bold-text">
                                                            {position.profile}
                                                        </label>

                                                    </div>
                                                ))}
                                            </form>

                                            {!isUserInTeam ? (
                                                <Button width="fullwidth" size="large" onClick={handleOpenModal}>Postularme</Button>
                                            ) : (
                                                <Button width="fullwidth" size="large" onClick={() => { console.log("Ya eres parte de este proyecto") }}>Postularme</Button>
                                            )}
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
                                    )
                                }
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

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="¿Quieres postularte a colaborar en el proyecto Web de cuentos?"
                    subtitle="Puedes cancelar tu postulación en cualquier momento."
                    actions={[
                        { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseModal },
                        { label: 'Postularme', color: 'primary', size: "large", width: "fullwidth", onClick: handleApplicationSubmit },
                    ]}
                >
                    <div className="project-detail-modal__content">
                        <div>
                            <h3 className="form-label">Mi rol en el proyecto sería...</h3>
                            <p className="input">{selectedPositionProfile}</p>
                        </div>

                        <div>
                            <Textarea label="¿Por qué deberían elegirme a mí?" rows={"8"} maxLength={1000} placeholder="Cuéntale al organizador por qué serías un buen fit para este proyecto en particular." name="message" value={applicationMessage} onChange={(e) => setApplicationMessage(e.target.value)} helperText={"Máximo 1000 caracteres."} />
                        </div>

                    </div>

                </Modal>

            </div>
        </main>
    )
}

export default ProjectDetailPage;