import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

//Obtener las postulaciones de un proyecto en particular
async function getRequestsByProjectId(id) {
    return db.collection("projects_requests").find({ project_id: id, status: 'Pending' }).toArray();
}

//Obtener las postulaciones enviadas por un usuario en particular
async function getRequestsByUserId(id) {
    return db.collection("projects_requests").find({ "candidate._id": id }).toArray();
}

//Agregar una nueva postulación
async function createRequest(request) {
    const requests = await db.collection("projects_requests").insertOne(request);
    request._id = requests.insertedId;

    return request;
}

async function editRequest(id, request) {
    const editedRequest = await db.collection("projects_requests").updateOne({ _id: new ObjectId(id) }, { $set: request });
    return editedRequest;
}

//Eliminar una postulación
async function deleteRequest(id) {
    const deletedRequest = await db.collection("projects_requests").deleteOne({ _id: new ObjectId(id) })
    return deletedRequest;
}

export {
    getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    editRequest,
    deleteRequest
}