import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const TabReviewsContent = () => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

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