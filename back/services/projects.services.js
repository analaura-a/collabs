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

//Obtener todos los proyectos de los que un usuario es parte
const getUserProjects = async (userId) => {

    try {
        await client.connect();

        // 1. Buscar todos los proyectos en los que el usuario es parte
        const projectMemberships = await db.collection('projects_teams')
            .find({ user_id: new ObjectId(userId) })
            .toArray();

        const projectIds = projectMemberships.map(membership => membership.project_id);

        if (projectIds.length === 0) {
            return { open: [], inProgress: [], completed: [] };
        }

        // 2. Obtener los datos de los proyectos a partir de los projectIds
        const projects = await db.collection('projects')
            .find({ _id: { $in: projectIds } })
            .toArray();

        // 3. Clasificar los proyectos por su estado
        const openProjects = projects.filter(project => project.status === 'Abierto');
        const inProgressProjects = projects.filter(project => project.status === 'En curso');
        const completedProjects = projects.filter(project => project.status === 'Finalizado');

        return {
            open: openProjects,
            inProgress: inProgressProjects,
            completed: completedProjects
        };

    } catch (error) {
        throw new Error('Error al obtener los proyectos del usuario: ' + error.message);
    }
};

//Crear un nuevo proyecto
const createProject = async (userId, projectData, type) => {

    try {
        await client.connect();

        //Generar un _id para cada open_position
        const openPositionsWithIds = projectData.open_positions.map(position => ({
            ...position,
            _id: new ObjectId(),
        }));

        //Crear el nuevo proyecto
        const newProject = {
            ...projectData,
            open_positions: openPositionsWithIds,
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

//Subir imagen del proyecto
const updateProjectImage = async (projectId, imagePath) => {

    try {
        // Actualizamos la imagen en el documento del proyecto
        await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { cover: imagePath } }
        );

        return;
    } catch (error) {
        throw new Error(`Error al actualizar la imagen del proyecto: ${error.message}`);
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
    getUserProjects,
    createProject,
    updateProjectImage
    // editProject,
    // deleteProject
}