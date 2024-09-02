import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");


//Obtener todos los proyectos
async function getProjects(filter = {}) {

    const filterMongo = { deleted: { $ne: true } }

    if (filter.name) {
        filterMongo.$text = { $search: filter.name }
    }

    return db
        .collection("projects")
        .find(filterMongo)
        .toArray();
}

//Obtener todos los proyectos abiertos
const getOpenProjects = async () => {

    await client.connect();

    const collection = db.collection("projects");

    const query = { status: "Abierto" };
    const openProjects = await collection.find(query).toArray();

    return openProjects;
};

//Obtener todos los proyectos de tipo personal
// async function getProjectsPersonal(filter = {}) {

//     const filterMongo = {
//         $and: [
//             { deleted: { $ne: true } },
//             { type: "Personal" }
//         ]
//     }

//     return db
//         .collection("projects")
//         .find(filterMongo)
//         .toArray();
// }

// //Obtener todos los proyectos de tipo open-source
// async function getProjectsOpenSource(filter = {}) {

//     const filterMongo = {
//         $and: [
//             { deleted: { $ne: true } },
//             { type: "Open-source" }
//         ]
//     }

//     return db
//         .collection("projects")
//         .find(filterMongo)
//         .toArray();
// }

// //Obtener todos los proyectos creados por un usuario en específico
// // async function getProjectsByUser(id) {
// //     return db.collection("projects").find({ "founder._id": new ObjectId(id) }).toArray();
// // }
// async function getProjectsByUser(id) {
//     return db.collection("projects").find({ "founder_id": id }).toArray();
// }

// //Obtener un proyecto en específico
// async function getProjectById(id) {
//     return db.collection("projects").findOne({ _id: new ObjectId(id) });
// }

// //Crear un nuevo proyecto
// async function createProject(project) {
//     const projects = await db.collection("projects").insertOne(project);
//     project._id = projects.insertedId;

//     return project;
// }

// //Editar un proyecto
// async function editProject(id, project) {
//     const editedProject = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: project });
//     return editedProject;
// }

// //Eliminar un proyecto
// const deleteProject = async (id) => {
//     const deletedProject = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } }); //Borrado lógico
//     return deletedProject;
// };


export {
    getProjects,
    getOpenProjects
    // getProjectsPersonal,
    // getProjectsOpenSource,
    // getProjectsByUser,
    // getProjectById,
    // createProject,
    // editProject,
    // deleteProject
}