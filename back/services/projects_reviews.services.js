import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

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
    createReview,
    findReview,
    updateReview
}