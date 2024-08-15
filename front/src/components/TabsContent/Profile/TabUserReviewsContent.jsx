import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfileByUsername } from "../../../services/userService";
import Button from "../../Button/Button";
import InputReviewIcon from '../../../assets/svg/directbox-send.svg?react';

const TabUserReviewsContent = () => {

    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUserProfile = async () => {
        try {
            const userData = await fetchUserProfileByUsername(username);
            setUser(userData);
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserProfile();
    }, [username]);

    if (loading) {
        return <div>Cargando...</div>; //Reemplazar por componente de carga
    }

    return (
        <>
            {/* Cambiar por la propiedad correcta */}
            {user.reviews ? (
                <section className="tab-reviews-container">
                    <div className="tab-reviews__rating-column"> {/* Mostrar dinámicamente */}
                        <div className="tab-profile__space-between">
                            <h2 className="title-18">Rating</h2>

                            <div className="tab-profile__collab-stats-column__status">
                                <div>
                                    <img src="../../assets/svg/star.svg" alt="Rating" />
                                    <p className="paragraph bold-text primary-color-text">90% recomiendan a {user.name}</p>
                                </div>

                                <p className="paragraph">Basado en <span className="primary-color-text">12</span> reseñas de <span className="primary-color-text">2</span> proyectos.</p>
                            </div>
                        </div>

                        <div className="tab-profile__space-between tab-reviews__rating-column__add-review">
                            <p className="paragraph">  ¿Colaboraste en algún proyecto junto a <span className="primary-color-text">{user.name}</span>? Comparte cómo fue tu experiencia con una reseña.</p>
                            <Button size="large" color="secondary" width="fullwidth" icon={<InputReviewIcon />}>Dejar una reseña</Button>
                        </div>
                    </div>

                    <div className="tab-reviews__reviews-column"> {/* Mostrar dinámicamente */}
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