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

//Obtener la cantidad de proyectos personales y open-source en los que el usuario colaboró
const getUserProjectsCount = async (userId) => {

    try {
        await client.connect();

        // 1. Obtener los proyectos en los que el usuario ha colaborado
        const userProjects = await db.collection('projects_teams')
            .find({ user_id: new ObjectId(userId) })
            .toArray();

        // 2. Obtener los IDs de los proyectos en los que ha colaborado el usuario
        const projectIds = userProjects.map(project => new ObjectId(project.project_id));

        // 3. Realizar una consulta en la colección 'projects' para obtener el tipo de cada proyecto
        const projects = await db.collection('projects')
            .find({ _id: { $in: projectIds } })
            .toArray();

        // 4. Clasificar los proyectos por tipo (Personal / Open-source)
        const personalProjects = projects.filter(project => project.type === 'Personal');
        const openSourceProjects = projects.filter(project => project.type === 'Open-source');

        // 5. Devolver los totales de cada tipo de proyecto
        return {
            personalProjectsCount: personalProjects.length,
            openSourceProjectsCount: openSourceProjects.length
        };

    } catch (error) {
        throw new Error('Error al obtener el número de proyectos del usuario: ' + error.message);
    }
};

//Obtener los últimos 2 proyectos de un usuario
const getLastTwoProjectsJoinedByUser = async (userId) => {

    try {
        await client.connect();

        // 1. Obtener los últimos 2 proyectos a los que se unió el usuario
        const userProjects = await db.collection('projects_teams')
            .find({
                user_id: new ObjectId(userId),
                status: 'Activo'
            })
            .sort({ joined_at: -1 })
            .limit(2)
            .toArray();

        // 2. Obtener los IDs de los proyectos
        const projectIds = userProjects.map(project => new ObjectId(project.project_id));

        // 3. Realizar una consulta en la colección 'projects' para obtener la info de cada proyecto
        const projects = await db.collection('projects')
            .find({ _id: { $in: projectIds } })
            .project({ _id: 1, name: 1 }) // Solo obtener el nombre y el ID de cada proyecto
            .toArray();

        // 4. Devolver los últimos 2 proyectos
        return projects;

    } catch (error) {
        throw new Error('Error al obtener los últimos proyectos del usuario: ' + error.message);
    }
};

// Obtener los proyectos recomendados para un usuario
const getRecommendedProjectsForUser = async (userId) => {

    try {
        await client.connect();

        // 1. Obtener los datos del usuario
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const { availability, preferences, roles, skills } = user;

        // 2. Consulta para obtener proyectos que coincidan al menos en una característica del usuario
        const projects = await db.collection('projects').find({
            status: 'Abierto',
            founder_id: { $ne: new ObjectId(userId) },
            $or: [
                { type: { $in: preferences } },
                { required_availability: availability },
                { "open_positions.profile": { $in: roles } },
                { "open_positions.required_skills": { $in: skills } }
            ]
        }).toArray();

        // 3. Calcular las coincidencias para cada proyecto
        const scoredProjects = projects.map(project => {
            let score = 0;

            // Incrementar el puntaje basado en las coincidencias
            if (preferences.includes(project.type)) score++;
            if (project.required_availability === availability) score++;
            if (project.open_positions.some(pos => roles.includes(pos.profile))) score++;
            if (project.open_positions.some(pos => pos.required_skills.some(skill => skills.includes(skill)))) score++;

            return { ...project, score };
        });

        // 4. Ordenar proyectos por puntaje (mayor número de coincidencias primero)
        const sortedProjects = scoredProjects.sort((a, b) => b.score - a.score);

        // 5. Devolver solo los 6 primeros proyectos con mayor puntaje
        const topProjects = sortedProjects.slice(0, 6);

        // 6. Para cada proyecto, obtenemos también los datos del organizador
        const projectWithOrganizerData = await Promise.all(topProjects.map(async (project) => {
            const founder = await db.collection('users').findOne(
                { _id: new ObjectId(project.founder_id) },
                { projection: { name: 1, last_name: 1, profile_pic: 1 } } // Solo obtener el nombre y la foto de perfil
            );

            return {
                ...project,
                organizer_name: `${founder.name} ${founder.last_name}`,
                organizer_photo: founder?.profile_pic || null
            };
        }));

        // 7. Devolver la información de los proyectos + de los organizadores
        return projectWithOrganizerData;

    } catch (error) {
        throw new Error('Error al obtener los proyectos recomendados: ' + error.message);
    }
};

// Obtener los últimos 3 proyectos creados
const getRecentProjects = async () => {
    try {
        await client.connect();

        // Obtener los últimos 3 proyectos
        const projects = await db.collection("projects")
            .find()
            .sort({ created_at: -1 })
            .limit(3)
            .project({ _id: 1, name: 1, about: 1, cover: 1, created_at: 1, founder_id: 1, open_positions: 1 })
            .toArray();

        // Enriquecer con datos del organizador
        const enrichedProjects = await Promise.all(
            projects.map(async (project) => {
                const organizer = await db.collection("users")
                    .findOne(
                        { _id: new ObjectId(project.founder_id) },
                        { projection: { name: 1, last_name: 1, profile_pic: 1 } }
                    );

                return {
                    ...project,
                    organizer_name: organizer?.name + " " + organizer?.last_name || "Usuario desconocido",
                    organizer_profile_pic: organizer?.profile_pic || null,
                };
            })
        );

        return enrichedProjects;
    } catch (error) {
        throw new Error(`Error al obtener los proyectos recientes: ${error.message}`);
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

// Eliminar un proyecto
const deleteProject = async (projectId) => {

    const projectObjectId = new ObjectId(projectId);

    const session = client.startSession();

    try {
        await session.withTransaction(async () => {

            // 1. Eliminar el proyecto
            await db.collection('projects').deleteOne({ _id: projectObjectId }, { session });

            // 2. Eliminar miembros del equipo
            await db.collection('projects_teams').deleteMany({ project_id: projectObjectId }, { session });

            // 3. Eliminar postulaciones 
            await db.collection('projects_requests').deleteMany({ project_id: projectObjectId }, { session });

            // 4. Eliminar shortcuts 
            await db.collection('projects_shortcuts').deleteMany({ project_id: projectObjectId }, { session });

            // 5. Eliminar reseñas 
            await db.collection('projects_reviews').deleteMany({ project_id: projectObjectId }, { session });

            // 6. Eliminar el chat del proyecto
            const chat = await db.collection('chats').findOneAndDelete({ project_id: projectObjectId }, { session });

            if (chat) {
                // 7. Eliminar todos los mensajes asociados al chat
                await db.collection('messages').deleteMany({ chat_id: chat._id }, { session });
            }
        });

    } catch (error) {
        throw new Error(`Error al eliminar el proyecto y datos relacionados: ${error.message}`);
    } finally {
        await session.endSession();
    }
};

export {
    getOpenProjects,
    getProjectById,
    getUserProjects,
    getUserProjectsCount,
    getLastTwoProjectsJoinedByUser,
    getRecommendedProjectsForUser,
    getRecentProjects,
    createProject,
    updateProjectImage,
    updateProjectDetails,
    updateProjectOpenPositions,
    updateProjectStatus,
    removeOpenPositionsByIds,
    deleteProject
}