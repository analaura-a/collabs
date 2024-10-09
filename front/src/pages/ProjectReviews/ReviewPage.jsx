import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
            <div className="container project-dashboard-page">

                <h1>Reseña para {reviewedUser.name} {reviewedUser.last_name}</h1>
                <h2>del proyecto {project.name}</h2>

                {project && reviewedUser &&
                    <ReviewForm
                        projectId={project._id}
                        reviewedUserId={reviewedUser._id}
                    />
                }

            </div>
        </main>
    )
}

export default ReviewPage;