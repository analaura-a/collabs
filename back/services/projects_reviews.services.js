import { ObjectId } from 'mongodb';
import { db, client } from '../db.js'

// Obtener/verificar si ya existe una reseña en particular
const findReview = async (projectId, reviewerId, reviewedUserId) => {

    try {
        await client.connect();

        return await db.collection('projects_reviews').findOne({
            project_id: new ObjectId(projectId),
            reviewer_id: new ObjectId(reviewerId),
            reviewed_user_id: new ObjectId(reviewedUserId)
        });
    } catch (error) {
        throw new Error(`Error al buscar reseña existente: ${error.message}`);
    }
};

// Obtener las reseñas de un usuario
const getReviewsByUserId = async (userId) => {

    try {
        await client.connect();

        // Obtener las reseñas del usuario
        const reviews = await db.collection('projects_reviews')
            .find({ reviewed_user_id: new ObjectId(userId) })
            .toArray();

        // Extraer los IDs de los proyectos y de los usuarios que hicieron las reseñas
        const projectIds = reviews.map(review => review.project_id);
        const reviewerIds = reviews.map(review => review.reviewer_id);

        // Obtener detalles de los proyectos
        const projects = await db.collection('projects')
            .find({ _id: { $in: projectIds } })
            .toArray();

        // Obtener detalles de los usuarios que hicieron las reseñas
        const reviewers = await db.collection('users')
            .find({ _id: { $in: reviewerIds } })
            .toArray();

        // Combinar los datos de reseñas, proyectos y usuarios
        const enrichedReviews = reviews.map(review => {
            const project = projects.find(proj => proj._id.equals(review.project_id));
            const reviewer = reviewers.find(user => user._id.equals(review.reviewer_id));

            return {
                ...review,
                projectName: project?.name,
                reviewer: {
                    name: reviewer?.name,
                    last_name: reviewer?.last_name,
                    username: reviewer?.username,
                    profile_pic: reviewer?.profile_pic,
                }
            };
        });

        return enrichedReviews;
    } catch (error) {
        throw new Error(`Error al obtener las reseñas del usuario: ${error.message}`);
    }
};

// Crear una reseña
const createReview = async (projectId, reviewerId, reviewedUserId, recommend, comment) => {

    try {
        await client.connect();

        const newReview = {
            project_id: new ObjectId(projectId),
            reviewer_id: new ObjectId(reviewerId),
            reviewed_user_id: new ObjectId(reviewedUserId),
            recommend,
            comment,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const result = await db.collection('projects_reviews').insertOne(newReview);

        return result;
    } catch (error) {
        throw new Error(`Error al crear la reseña: ${error.message}`);
    }
};

// Editar una reseña
const updateReview = async (reviewId, updatedData) => {

    try {
        await client.connect();

        const result = await db.collection('projects_reviews').findOneAndUpdate(
            { _id: new ObjectId(reviewId) },
            { $set: { ...updatedData, updated_at: new Date() } },
            { returnDocument: 'after' }
        );

        return result;
    } catch (error) {
        throw new Error(`Error al actualizar la reseña: ${error.message}`);
    }
};

export {
    findReview,
    getReviewsByUserId,
    createReview,
    updateReview
}