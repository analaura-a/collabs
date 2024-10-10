import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../../services/userService";
import { getUserReviews } from '../../../services/reviewService';
import Button from "../../Button/Button";
import InputReviewIcon from '../../../assets/svg/directbox-send.svg?react';

const TabUserReviewsContent = () => {

    const { username } = useParams();

    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    const totalProjects = new Set(reviews.map(review => review.project_id)).size;
    const recommendCount = reviews.filter(review => review.recommend).length;
    const recommendPercentage = ((recommendCount / reviews.length) * 100).toFixed(0);

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
                            <Button size="large" color="secondary" width="fullwidth" icon={<InputReviewIcon />}>Dejar una reseña</Button>
                        </div>
                    </div>

                    <div className="tab-reviews__reviews-column">
                        <h2 className="title-18">Reseñas</h2>
                        <div>
                            {/*Reseñas aquí*/}
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

                        <Button size="large" width="full-then-fit">Dejar una reseña</Button>
                    </div>

                </section>
            )}
        </>
    );
};

export default TabUserReviewsContent;