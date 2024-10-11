import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../../services/userService";
import { getUserReviews } from '../../../services/reviewService';
import { getSharedCompletedProjects } from "../../../services/teamService";
import Modal from "../../Modal/Modal";
import ReviewCard from '../../Cards/ReviewCard';
import Button from "../../Button/Button";
import InputReviewIcon from '../../../assets/svg/directbox-send.svg?react';

const TabUserReviewsContent = () => {

    const navigate = useNavigate();

    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sharedProjects, setSharedProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);

            const userReviews = await getUserReviews(userData._id);
            setReviews(userReviews);
        } catch (error) {
            console.error('Error al obtener las reseñas del usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadSharedProjects = async () => {
        try {
            const projects = await getSharedCompletedProjects(user._id);
            setSharedProjects(projects);
        } catch (error) {
            console.error('Error al obtener los proyectos compartidos:', error);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    const totalProjects = new Set(reviews.map(review => review.project_id)).size;
    const recommendCount = reviews.filter(review => review.recommend).length;
    const recommendPercentage = ((recommendCount / reviews.length) * 100).toFixed(0);

    const openReviewModal = async () => {
        await loadSharedProjects();
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleSelectProject = () => {
        if (!selectedProjectId) {
            setError('Por favor, selecciona un proyecto para continuar.');
            return;
        }

        navigate(`/mis-proyectos/${selectedProjectId}/reseñar/${user._id}`);
    };

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <>
            {reviews.length > 0 ? (
                <section className="tab-reviews-container">

                    <div className="tab-reviews__rating-column">
                        <div className="tab-profile__space-between">
                            <h2 className="title-18">Rating</h2>

                            <div className="tab-profile__collab-stats-column__status">
                                <div>
                                    <img src="../../assets/svg/star.svg" alt="Rating" />
                                    <p className="paragraph bold-text primary-color-text">{recommendPercentage}% recomienda a {user.name}</p>
                                </div>

                                <p className="paragraph">Basado en <span className="primary-color-text">{reviews.length}</span> {reviews.length === 1 ? "reseña" : "reseñas"} de <span className="primary-color-text">{totalProjects}</span> {totalProjects === 1 ? "proyecto" : "proyectos"}.</p>
                            </div>
                        </div>

                        <div className="tab-profile__space-between tab-reviews__rating-column__add-review">
                            <p className="paragraph">  ¿Colaboraste en algún proyecto junto a <span className="primary-color-text">{user.name}</span>? Comparte cómo fue tu experiencia con una reseña.</p>
                            <Button size="large" color="secondary" width="fullwidth" icon={<InputReviewIcon />} onClick={openReviewModal}>Dejar una reseña</Button>
                        </div>
                    </div>

                    <div className="tab-reviews__reviews-column">
                        <h2 className="title-18">Reseñas</h2>
                        <div>
                            {reviews.map((review) => (
                                <ReviewCard key={review._id} review={review} reviewedUserName={user.name} />
                            ))}
                        </div>
                    </div>

                </section>
            ) : (
                <section className="tab-reviews__empty-state">

                    <div className="tab-reviews__empty-state-container">
                        <img src="../../assets/svg/reviews-empty-state.svg" alt="Sin reseñas" />

                        <div>
                            <h2 className="title-32-medium">{user.name} aún no recibió reseñas</h2>
                            <p className="subtitle-18">¿Colaboraste en algún proyecto junto a {user.name}? Comparte cómo fue tu experiencia con una reseña.</p>
                        </div>

                        <Button size="large" width="full-then-fit" onClick={openReviewModal}>Dejar una reseña</Button>
                    </div>

                </section>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title={`Reseñar a ${user.name} ${user.last_name}`}
                subtitle={sharedProjects.length === 0 ? `Aún no trabajaste en ningún proyecto junto a ${user.name}, por lo que no puedes dejarle una reseña.` : "Selecciona el proyecto en el que trabajaron juntos y para el cual te gustaría dejar una reseña."}
                actions={sharedProjects.length > 0 ? [
                    { label: 'Cancelar', color: 'secondary', size: "large", width: "fullwidth", onClick: closeModal },
                    { label: 'Siguiente', color: 'primary', size: "large", width: "fullwidth", onClick: () => handleSelectProject() }
                ] : [
                    { label: 'Volver atrás', color: 'secondary', size: "large", width: "fullwidth", onClick: closeModal },
                ]}
            >
                {sharedProjects.length !== 0 &&
                    <div className="tab-review-modal__content">
                        <div className="tab-review-modal__content">
                            {sharedProjects.map(project => (
                                <div key={project.projectId} className={`checkbox-item ${selectedProjectId === project.projectId ? 'checkbox-item-checked' : ''}`} onClick={() => setSelectedProjectId(project.projectId)}>
                                    <input
                                        type="radio"
                                        name="project"
                                        id={project.projectId}
                                        value={project.projectId}
                                        checked={selectedProjectId === project.projectId}
                                        onChange={(e) => e.stopPropagation()}
                                        className="hidden-input"
                                    />
                                    <label htmlFor={project.projectId} className="subtitle bold-text">
                                        {project.projectName}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {error && <p className="error-text">{error}</p>}
                    </div>
                }
            </Modal>
        </>
    );
};

export default TabUserReviewsContent;