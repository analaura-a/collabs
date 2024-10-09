import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById } from '../../services/projectService';
import { getUserById } from '../../services/userService';
import ReviewForm from '../../components/Form/Review/ReviewForm';

const ReviewPage = () => {

    const { projectId, reviewedUserId } = useParams();

    const [project, setProject] = useState(null);
    const [reviewedUser, setReviewedUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            // Obtener los datos del proyecto
            const projectData = await getProjectById(projectId);

            if (projectData.status !== 'Finalizado') {
                navigate(`/mis-proyectos/${projectId}`);
                return;
            }

            setProject(projectData);

            // Obtener los datos del usuario a ser reseñado
            const userData = await getUserById(reviewedUserId);
            setReviewedUser(userData);
        } catch (error) {
            console.error('Error al cargar los datos para reseñar:', error);
            navigate(`/mis-proyectos/${projectId}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [projectId, reviewedUserId, navigate]);

    if (loading) return <div>Cargando...</div>;  // Componente de carga

    return (
        <main>
            <div className="container review-page">

                <Link to={`/mis-proyectos/${projectId}`} className="small-button-with-icon arrow-left"></Link>

                <div className="review-page__content">
                    <div className="review-page__title">
                        <h1 className="title-40">Reseña para <span className="primary-color-text">{reviewedUser.name} {reviewedUser.last_name}</span></h1>
                        <h2 className="big-subtitle">del proyecto <span className="medium-text">{project.name}</span></h2>
                    </div>

                    {project && reviewedUser &&
                        <ReviewForm
                            projectId={project._id}
                            reviewedUserId={reviewedUser._id}
                        />
                    }
                </div>

            </div>
        </main>
    )
}

export default ReviewPage;