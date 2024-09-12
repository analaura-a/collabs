import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// //Obtener las postulaciones de un proyecto en particular
// async function getRequestsByProjectId(id) {
//     return db.collection("projects_requests").find({ project_id: id, status: 'Pending' }).toArray();
// }

//Obtener las postulaciones de un usuario por id
const getRequestsByUserId = async (userId) => {

    try {
        const requests = await db.collection('projects_requests')
            .find({ user_id: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();

        return requests;
    } catch (error) {
        throw new Error('Error al obtener las postulaciones del usuario: ' + error.message);
    }
};

//Agregar una nueva postulación
const createRequest = async ({ userId, projectId, appliedRole, openPositionId }) => {

    try {
        await client.connect();

        // Verificar si la postulación ya existe
        const existingRequest = await db.collection('projects_requests').findOne({
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId),
            open_position_id: new ObjectId(openPositionId)
        });

        if (existingRequest) {
            throw new Error('Ya te has postulado para este rol en este proyecto.');
        }

        // Crear una nueva postulación
        const newRequest = {
            user_id: new ObjectId(userId),
            project_id: new ObjectId(projectId),
            applied_role: appliedRole,
            open_position_id: new ObjectId(openPositionId),
            status: 'Pendiente',
            created_at: new Date()
        };

        const result = await db.collection('projects_requests').insertOne(newRequest);
        return result;
    } catch (error) {
        throw new Error(`Error al crear la postulación: ${error.message}`);
    }
};

// async function editRequest(id, request) {
//     const editedRequest = await db.collection("projects_requests").updateOne({ _id: new ObjectId(id) }, { $set: request });
//     return editedRequest;
// }

// //Eliminar una postulación
// async function deleteRequest(id) {
//     const deletedRequest = await db.collection("projects_requests").deleteOne({ _id: new ObjectId(id) })
//     return deletedRequest;
// }

export {
    // getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    // editRequest,
    // deleteRequest
}