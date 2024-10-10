import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { getUserReviews } from '../../../services/reviewService';
import ReviewCard from '../../Cards/ReviewCard';

const TabReviewsContent = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserReviews = async () => {
        try {
            const userReviews = await getUserReviews(user._id);
            setReviews(userReviews);
        } catch (error) {
            console.error('Error al obtener las reseñas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserReviews();
    }, [user._id]);

    const totalProjects = new Set(reviews.map(review => review.project_id)).size;
    const recommendCount = reviews.filter(review => review.recommend).length;
    const recommendPercentage = ((recommendCount / reviews.length) * 100).toFixed(0);

    if (loading) return <div>Cargando...</div>; //Reemplazar por componente de carga

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
                            <h2 className="title-32-medium">Aún no recibiste ninguna reseña</h2>
                            <p className="subtitle-18">Una vez que termines de colaborar en algún proyecto en particular, los comentarios de tus compañeros de equipo se mostrarán aquí.</p>
                        </div>
                    </div>

                </section>
            )}
        </>
    );
};

export default TabReviewsContent;