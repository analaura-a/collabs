import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReview, createReview, updateReview } from '../../../services/reviewService';
import { createNotification } from '../../../services/notificationService';
import reviewSchema from '../../../validation/reviewValidation';
import AuthContext from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import Textarea from '../../Inputs/Textarea';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';

const ReviewForm = ({ project, projectId, reviewedUserId, reviewedUserName }) => {

    const navigate = useNavigate();

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    const [isEditMode, setIsEditMode] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    const [recommend, setRecommend] = useState(null);
    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const { addToast } = useToast();

    const fetchReviewData = async () => {
        try {
            // Verificar si ya existe la reseña
            const review = await getReview(projectId, reviewedUserId);
            if (review) {
                setIsEditMode(true);  // Cambiamos a "modo edición"
                setRecommend(review.recommend);
                setComment(review.comment);
                setReviewId(review._id);
            }
        } catch (error) {
            if (error.message === "Reseña no encontrada.") {
                return
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al cargar la reseña',
                    message: 'Ocurrió un error desconocido al intentar cargar la reseña. Inténtalo de nuevo más tarde.'
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviewData();
    }, [projectId, reviewedUserId]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const reviewData = { recommend, comment };

        try {
            // Validamos los datos 
            await reviewSchema.validate(reviewData, { abortEarly: false });

            if (isEditMode) {
                // Editar la reseña existente
                await updateReview(projectId, reviewId, { recommend, comment });

                addToast({
                    type: 'success',
                    title: '¡Reseña actualizada con éxito!',
                    message: `Se editó correctamente la reseña para ${reviewedUserName}.`
                });
            } else {
                // Crear una nueva reseña
                await createReview(projectId, reviewedUserId, { recommend, comment });

                // Enviar notificación
                await createNotification({
                    user_id: reviewedUserId,
                    sender_id: user._id,
                    type: 'review-received',
                    message: `${user.name} ${user.last_name} te dejó una reseña sobre la experiencia colaborativa en el proyecto ${project.name}, ¡revisa tu perfil!`,
                });

                // Mostrar mensaje al usuario
                addToast({
                    type: 'success',
                    title: '¡Reseña creada con éxito!',
                    message: `Se envió correctamente la reseña para ${reviewedUserName}.`
                });
            }

            navigate(`/mis-proyectos/${projectId}`);
        } catch (err) {
            if (err.name === "ValidationError") {
                const yupErrors = {};
                err.inner.forEach((error) => {
                    yupErrors[error.path] = error.message;
                });
                setErrors(yupErrors);
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al enviar la reseña',
                    message: 'Ocurrió un error desconocido al intentar enviar la reseña. Inténtalo de nuevo más tarde.'
                });
            }
        }
    };

    if (loading) {
        return <Loader size="small" message=""/>;
    }

    return (
        <form className="review-page__form" onSubmit={handleSubmit} noValidate>

            <fieldset className="review-page__form__fieldset">
                <legend className="form-label">¿Recomendarías a otras personas colaborar con {reviewedUserName}?<span className="primary-color-text">*</span></legend>

                <div className="input-group-with-text">
                    <div>
                        <div className={`checkbox-item ${recommend === true ? 'checkbox-item-checked' : ''}`} onClick={() => setRecommend(true)}>
                            <input
                                type="radio"
                                name="recommend"
                                id="true"
                                value="true"
                                checked={recommend === true}
                                onChange={(e) => e.stopPropagation()}
                                className="hidden-input"
                            />

                            <label htmlFor="true" className="subtitle bold-text">
                                Sí, lo recomiendo
                            </label>
                        </div>

                        <div className={`checkbox-item ${recommend === false ? 'checkbox-item-checked' : ''}`} onClick={() => setRecommend(false)}>
                            <input
                                type="radio"
                                name="recommend"
                                id="false"
                                value="false"
                                checked={recommend === false}
                                onChange={(e) => e.stopPropagation()}
                                className="hidden-input"
                            />

                            <label htmlFor="false" className="subtitle bold-text">
                                No, no lo recomiendo
                            </label>
                        </div>
                    </div>

                    {errors.recommend && <p className="error-text">{errors.recommend}</p>}
                </div>
            </fieldset>

            <Textarea
                label="¿Por qué? Cuéntanos"
                id="comment"
                name="comment"
                value={comment}
                rows={"10"}
                maxLength={1500}
                placeholder="Añade toda la información que creas relevante sobre esta experiencia colaborativa."
                helperText={"Máximo 1500 caracteres."}
                onChange={(e) => setComment(e.target.value)}
                errorText={errors.comment}
                required
            />

            <Button type="submit" size="large" width="fullwidth">{isEditMode ? 'Actualizar reseña' : 'Enviar reseña'}</Button>

        </form >
    )
}

export default ReviewForm;