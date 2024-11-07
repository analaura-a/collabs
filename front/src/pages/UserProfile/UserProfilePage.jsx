import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { fetchUserProfileByUsername } from "../../services/userService";
import { getUserProjects } from "../../services/projectService";
import { createNotification } from "../../services/notificationService";
import { createChat } from "../../services/chatService";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/Button/Button";
import Tabs from '../../components/Tabs/Tabs';
import Modal from "../../components/Modal/Modal";
import TabUserProfileContent from "../../components/TabsContent/Profile/TabUserProfileContent";
import TabUserReviewsContent from "../../components/TabsContent/Profile/TabUserReviewsContent";
import MessageIcon from '../../assets/svg/messages-2.svg?react';
import Loader from "../../components/Loader/Loader";
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const UserProfilePage = () => {

    const { authState } = useContext(AuthContext);
    const { addToast } = useToast();

    const { username } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [openProjects, setOpenProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    useEffect(() => {
        if (authState.user && username === authState.user.username) {
            navigate('/mi-perfil');
        }
    }, [username, authState.user, navigate]);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar el perfil del usuario',
                message: 'Ocurrió un error desconocido al intentar cargar el perfil del usuario. Inténtalo de nuevo más tarde.'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    useEffect(() => {
        if (!loading && !user) {
            navigate('*');
        }
    }, [loading, user, navigate]);

    const formatRoles = (roles) => {
        return roles.map((role, index) => (
            <React.Fragment key={index}>
                <span className="bolder-text">{role}</span>
                {index < roles.length - 2 ? ', ' : index === roles.length - 2 ? ' o ' : ''}
            </React.Fragment>
        ));
    };

    const formatJoinDate = (dateString) => {
        const options = { year: 'numeric', month: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    };

    const handleOpenModal = async () => {
        try {
            const projects = await getUserProjects(authState.user._id);
            setOpenProjects(projects.openProjects);

            setModalOpen(true);
        } catch (error) {
            console.error(error);
            setModalOpen(true);
        }
    }
    const handleCloseModal = () => setModalOpen(false);

    const handleSendInvitation = async () => {

        if (!selectedProjectId) {
            setError('Por favor, selecciona un proyecto para continuar.');
            return;
        }

        handleCloseModal();
        setError(null);

        try {
            // Enviar invitación
            await createNotification({
                user_id: user._id,
                sender_id: authState.user._id,
                type: 'project-invitation',
                message: `${authState.user.name} ${authState.user.last_name} te invitó a colaborar en el proyecto ${selectedProject.name}, ¡revisa su convocatoria!`,
                related_resource_id: selectedProjectId,
            });

            // Notificar al usuario
            addToast({
                type: 'success',
                title: '¡Invitación enviada con éxito!',
                message: `${user.name} ${user.last_name} recibió tu invitación para el proyecto ${selectedProject.name}.`
            });

        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al enviar la invitación',
                message: 'Ocurrió un error desconocido al intentar enviar la invitación. Inténtalo de nuevo más tarde.'
            });
        }

    }

    const handleSendMessage = async () => {
        try {
            // Intentar crear el chat
            await createChat({
                type: "private",
                participants: [
                    `${user._id}`,
                    `${authState.user._id}`
                ]
            });

            //Redirigir al chat
            navigate('/mensajes');
        } catch (error) {

            const errorMessage = error.response?.data?.message || error.message;

            if (errorMessage === 'El chat ya existe') {
                // Si el chat ya existe, redirigir al chat sin mostrar error
                navigate('/mensajes');
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al crear el chat',
                    message: 'Ocurrió un error desconocido al intentar crear el chat. Inténtalo de nuevo más tarde.'
                });
            }
        }
    }

    const tabs = [
        { label: 'Perfil', content: <TabUserProfileContent /> },
        { label: 'Reseñas', content: <TabUserReviewsContent /> },
    ];

    if (loading) {
        return <Loader message="Cargando perfil..." />;
    }

    return (
        <main>
            <div className="container profile-page-container">

                <section className="profile-page__header">

                    <div className="profile-page__header__profile-info">

                        <div className="profile-page__header__profile-info__photo-and-name-container">

                            {user.profile_pic ? (
                                <div className="profile-page__header__profile-info__photo-container">
                                    <img src={`${SERVER_BASE_URL}${user.profile_pic}`} alt={`${user.name} ${user.last_name}`} />
                                </div>
                            ) : (
                                <div className="profile-page__header__profile-info__photo-container">
                                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Sin foto de perfil" />
                                </div>
                            )}

                            <div className="profile-page__header__profile-info__name-container">
                                <h1 className="title-32">{user.name} {user.last_name}</h1>
                                <p className="profile-username">@{user.username}</p>
                            </div>

                        </div>

                        <div className="profile-page__header__profile-info__bio-container">
                            <p className="profile-bio">Quiero unirme a colaborar en proyectos como {formatRoles(user.roles)}.</p>

                            <div>
                                {user.location &&
                                    <div className="profile-page__header__profile-info__bio-details-container">
                                        <img src="../assets/svg/location.svg" alt="Ubicación" />
                                        <p className="profile-bio__details">{user.location}</p>
                                    </div>}

                                <div className="profile-page__header__profile-info__bio-details-container">
                                    <img src="../assets/svg/calendar.svg" alt="Fecha de creación de cuenta" />
                                    <p className="profile-bio__details">Se unió en {formatJoinDate(user.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="profile-page__header__actions">

                        <Button color="secondary" width="full-then-fit" size="large" onClick={handleSendMessage}>Enviar mensaje</Button>

                        <div className="profile-page__header__actions__portfolio-container">

                            <div className="title-with-icon">
                                <img src="../assets/svg/notes-with-background.svg" alt="Portfolio" />
                                <h2 className="title-18">Portfolio</h2>
                            </div>

                            {user.portfolio_link ? (
                                <a href={user.portfolio_link} target="_blank" className="profile-page__header__actions__portfolio-container__portfolio-link">
                                    <p>{user.portfolio_link.replace(/^https?:\/\//, "")}</p>
                                    <img src="../assets/svg/export.svg" alt="Link externo al portfolio" />
                                </a>
                            ) : (
                                <p className="subtitle">{user.name} aún no agregó su portfolio.</p>
                            )}

                            <Button width="fullwidth" size="large" icon={<MessageIcon />} onClick={handleOpenModal}>Invitar a colaborar</Button>

                        </div>

                    </div>

                </section>

                <Tabs tabs={tabs} />

            </div >

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={`Invitar a colaborar a ${user.name} ${user.last_name} en un proyecto`}
                subtitle={openProjects.length > 0 ? "Selecciona el proyecto con convocatoria abierta:" : "No eres parte de ningún proyecto con convocatoria abierta en la actualidad."}
                actions={openProjects.length > 0 ? [
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseModal },
                    { label: 'Enviar', color: 'primary', size: "large", width: "fullwidth", onClick: handleSendInvitation }
                ] : [
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: handleCloseModal },
                ]}
            >
                {openProjects.length !== 0 &&
                    <div className="tab-review-modal__content">

                        <div className="tab-review-modal__content">
                            {openProjects.map(project => (
                                <div key={project._id} className={`checkbox-item ${selectedProjectId === project._id ? 'checkbox-item-checked' : ''}`} onClick={() => { setSelectedProjectId(project._id); setSelectedProject(project) }}>
                                    <input
                                        type="radio"
                                        name="project"
                                        id={project._id}
                                        value={project._id}
                                        checked={selectedProjectId === project._id}
                                        onChange={(e) => e.stopPropagation()}
                                        className="hidden-input"
                                    />
                                    <label htmlFor={project._id} className="subtitle bold-text">
                                        {project.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {error && <p className="error-text">{error}</p>}
                    </div>
                }
            </Modal>
        </main >
    )
}

export default UserProfilePage;