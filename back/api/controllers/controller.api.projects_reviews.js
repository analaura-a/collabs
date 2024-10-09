import * as service from "../../services/projects_reviews.services.js";

// Crear una reseña
const createReview = async (req, res) => {

    const { projectId } = req.params;
    const { reviewedUserId, recommend, comment } = req.body;
    const reviewerId = req.account._id;

    if (typeof recommend !== 'boolean' || !comment) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si ya existe una reseña de este usuario para este proyecto
        const existingReview = await service.findReview(projectId, reviewerId, reviewedUserId);
        if (existingReview) {
            return res.status(409).json({ message: 'Ya has dejado una reseña para este usuario en este proyecto.' });
        }

        //Crear nueva reseña
        const newReview = await service.createReview(projectId, reviewerId, reviewedUserId, recommend, comment);
        res.status(201).json({ message: 'Reseña creada con éxito.', review: newReview });
    } catch (error) {
        res.status(500).json({ message: `Error al crear la reseña: ${error.message}` });
    }
};

// Editar una reseña
const updateReview = async (req, res) => {

    const { reviewId } = req.params;
    const { recommend, comment } = req.body;

    if (typeof recommend !== 'boolean' || !comment) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const updatedReview = await service.updateReview(reviewId, { recommend, comment });
        res.status(200).json({ message: 'Reseña actualizada con éxito.', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la reseña: ${error.message}` });
    }
};

export {
    createReview,
    updateReview
}