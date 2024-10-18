import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// Obtener una postulación por id
const getRequestById = async (id) => {
    return await db.collection('projects_requests').findOne({ _id: new ObjectId(id) });
};

const getRequestsByProjectId = async (projectId) => {

    try {
        await client.connect();

        // Obtener las postulaciones del proyecto
        const requests = await db.collection('projects_requests')
            .find({
                project_id: new ObjectId(projectId),
                status: 'Pendiente'
            })
            .sort({ created_at: -1 })
            .toArray();

        // Si no hay postulaciones, devolver un array vacío
        if (!requests || requests.length === 0) {
            return [];
        }

        // Obtener los IDs de los usuarios que han enviado postulaciones
        const userIds = requests.map(request => request.user_id);

        // Consultar los detalles de los usuarios desde la colección 'users'
        const userDetails = await db.collection('users')
            .find({ _id: { $in: userIds } })
            .toArray();

        // Enriquecer las postulaciones con los datos de los usuarios
        const enrichedRequests = requests.map(req => {
            const userDetail = userDetails.find(user => user._id.equals(req.user_id));
            return {
                ...req,
                user: {
                    name: userDetail?.name,
                    last_name: userDetail?.last_name,
                    username: userDetail?.username,
                    profile_pic: userDetail?.profile_pic,
                    availability: userDetail?.availability,
                    location: userDetail?.location
                },
            };
        });

        return enrichedRequests;
    } catch (error) {
        throw new Error(`Error al obtener las postulaciones del proyecto: ${error.message}`);
    }
};

//Obtener las postulaciones de un usuario en particular
const getRequestsByUserId = async (userId) => {

    try {
        const requests = await db.collection('projects_requests')
            .find({ user_id: new ObjectId(userId) })
            .sort({ created_at: -1 })
            .toArray();

        return requests;
    } catch (error) {
        throw new Error('Error al obtener las postulaciones del usuario: ' + error.message);
    }
};

//Agregar una nueva postulación
const createRequest = async ({ userId, projectId, appliedRole, openPositionId, message }) => {

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
            message,
            status: 'Pendiente',
            created_at: new Date()
        };

        const result = await db.collection('projects_requests').insertOne(newRequest);
        return result;
    } catch (error) {
        throw new Error(`Error al crear la postulación: ${error.message}`);
    }
};

//Aceptar una postulación
const acceptProjectRequest = async (requestId) => {

    try {
        await client.connect();

        const updatedRequest = await db.collection('projects_requests').findOneAndUpdate(
            { _id: new ObjectId(requestId) },
            { $set: { status: 'Aprobada' } },
            { returnDocument: 'after' }
        );

        return updatedRequest;
    } catch (error) {
        throw new Error('Error al aceptar la postulación: ' + error.message);
    }
};

//Declinar una postulación
const declineProjectRequest = async (requestId) => {

    try {
        await client.connect();

        const updatedRequest = await db.collection('projects_requests').findOneAndUpdate(
            { _id: new ObjectId(requestId) },
            { $set: { status: 'Declinada' } },
            { returnDocument: 'after' }
        );

        return updatedRequest;
    } catch (error) {
        throw new Error('Error al declinar la postulación: ' + error.message);
    }
};

// Declinar las otras postulaciones de un mismo usuario para un proyecto
const declineOtherRequests = async ({ projectId, userId, excludeRequestId }) => {

    try {
        await client.connect();

        const filter = {
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId),
            _id: { $ne: new ObjectId(excludeRequestId) },
            status: 'Pendiente'
        };

        const update = {
            $set: { status: 'Declinada' }
        };

        const result = await db.collection('projects_requests').updateMany(filter, update);
        return result;
    } catch (error) {
        throw new Error(`Error al declinar otras postulaciones del usuario: ${error.message}`);
    }
};

// Declinar todas las postulaciones pendientes de un proyecto
const declineAllPendingRequests = async (projectId) => {

    try {
        await client.connect();

        // Actualizar todas las postulaciones con estado "Pendiente" a "Declinada" para un proyecto específico
        const result = await db.collection('projects_requests').updateMany(
            {
                project_id: new ObjectId(projectId),
                status: "Pendiente"
            },
            { $set: { status: "Declinada" } }
        );

        return result;
    } catch (error) {
        throw new Error(`Error al declinar las postulaciones pendientes: ${error.message}`);
    }
};

//Eliminar una postulación
const deleteRequest = async (id) => {
    return await db.collection('projects_requests').deleteOne({ _id: new ObjectId(id) });
};

export {
    getRequestById,
    getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    acceptProjectRequest,
    declineProjectRequest,
    declineOtherRequests,
    declineAllPendingRequests,
    deleteRequest
}