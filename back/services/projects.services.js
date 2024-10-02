import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

//Obtener todos los proyectos abiertos
const getOpenProjects = async () => {

    await client.connect();

    const collection = db.collection("projects");

    const query = { status: "Abierto" };
    const openProjects = await collection.find(query).toArray();

    return openProjects;
};

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
            .find({
                user_id: new ObjectId(userId),
                status: 'Activo'
            })
            .toArray();

        const projectIds = projectMemberships.map(membership => membership.project_id);

        if (projectIds.length === 0) {
            return { open: [], inProgress: [], completed: [] };
        }

        // 2. Obtener los datos de los proyectos a partir de los projectIds
        const projects = await db.collection('projects')
            .find({ _id: { $in: projectIds } })
            .sort({ created_at: -1 })
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

// Editar los detalles de un proyecto
const updateProjectDetails = async (projectId, projectDetails) => {

    try {
        await client.connect();

        const updatedProject = await db.collection('projects').findOneAndUpdate(
            { _id: new ObjectId(projectId) },
            { $set: projectDetails },
            { returnDocument: 'after' }
        );

        if (!updatedProject) {
            throw new Error('Proyecto no encontrado.');
        }

        return updatedProject;
    } catch (error) {
        throw new Error('Error al actualizar el proyecto: ' + error.message);
    }
};

// Editar la convocatoria de un proyecto
const updateProjectOpenPositions = async (projectId, openPositions) => {

    try {
        await client.connect();

        // Actualizar la convocatoria del proyecto
        const updateResult = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $set: { open_positions: openPositions } }
        );

        // Comprobar si se actualizó
        if (updateResult.matchedCount === 0) {
            throw new Error('Proyecto no encontrado.');
        }

        // Obtener el proyecto actualizado
        const updatedProject = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });

        return updatedProject;
    } catch (error) {
        throw new Error('Error al actualizar la convocatoria: ' + error.message);
    }
};

// Cambiar el estado de un proyecto
const updateProjectStatus = async (projectId, newStatus) => {

    try {
        await client.connect();

        const updatedProject = await db.collection('projects').findOneAndUpdate(
            { _id: new ObjectId(projectId) },
            { $set: { status: newStatus } },
            { returnDocument: 'after' }
        );

        if (!updatedProject) {
            throw new Error('El proyecto no existe.');
        }

        return updatedProject;
    } catch (error) {
        throw new Error(`Error al cambiar el estado del proyecto: ${error.message}`);
    }
};

//Eliminar una posición de la convocatoria de un proyecto
const removeOpenPositionsByIds = async (projectId, positionIds) => {

    try {
        const result = await db.collection('projects').updateOne(
            { _id: new ObjectId(projectId) },
            { $pull: { open_positions: { _id: { $in: positionIds.map(id => new ObjectId(id)) } } } }
        );
        return result;
    } catch (error) {
        throw new Error('Error al eliminar las posiciones: ' + error.message);
    }
};

// //Eliminar un proyecto
// const deleteProject = async (id) => {
//     const deletedProject = await db.collection("projects").updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } }); //Borrado lógico
//     return deletedProject;
// };


export {
    getOpenProjects,
    getProjectById,
    getUserProjects,
    createProject,
    updateProjectImage,
    updateProjectDetails,
    updateProjectOpenPositions,
    updateProjectStatus,
    removeOpenPositionsByIds,
    // deleteProject
}