import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");


// //Obtener todos los proyectos
// async function getProjects(filter = {}) {

//     const filterMongo = { deleted: { $ne: true } }

//     if (filter.name) {
//         filterMongo.$text = { $search: filter.name }
//     }

//     return db
//         .collection("projects")
//         .find(filterMongo)
//         .toArray();
// }

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

//Obtener un proyecto en particular por ID
async function getProjectById(id) {

    try {
        await client.connect();
        const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });

        return project;
    } catch (error) {
        throw new Error('Error al buscar el proyecto en la base de datos.');
    }

}

//Crear un nuevo proyecto
const createProject = async (userId, projectData, type) => {

    try {
        await client.connect();

        const newProject = {
            ...projectData,
            founder_id: new ObjectId(userId),
            type,
            status: "Abierto",
            created_at: new Date(),
        };

        const result = await db.collection('projects').insertOne(newProject);
        return result;
    } catch (error) {
        throw new Error(`Error al crear el proyecto ${type}: ` + error.message);
    }
};

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
    // getProjects,
    getOpenProjects,
    // getProjectsPersonal,
    // getProjectsOpenSource,
    // getProjectsByUser,
    getProjectById,
    createProject,
    // editProject,
    // deleteProject
}