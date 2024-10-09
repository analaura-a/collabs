import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReview, createReview, updateReview } from '../../../services/reviewService';
import reviewSchema from '../../../validation/reviewValidation';
import Textarea from '../../Inputs/Textarea';
import Button from '../../Button/Button';

const ReviewForm = ({ projectId, reviewedUserId, reviewedUserName }) => {

    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false);
    const [reviewId, setReviewId] = useState(null);

    const [recommend, setRecommend] = useState(null);
    const [comment, setComment] = useState('');

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

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
            console.error('Error al cargar la reseña:', error);
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
                console.log('Reseña actualizada con éxito');
            } else {
                // Crear una nueva reseña
                await createReview(projectId, reviewedUserId, { recommend, comment });
                console.log('Reseña creada con éxito');
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
                console.error('Error al enviar la reseña:', err);
            }
        }
    };

    if (loading) return <div>Cargando...</div>; // Componente de carga

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