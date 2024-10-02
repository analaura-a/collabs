import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// Agregar miembro al equipo de un proyecto
const addMemberToProjectTeam = async ({ projectId, userId, role, profile }) => {

    try {
        await client.connect();

        const newTeamMember = {
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId),
            role, // "Organizador" o "Colaborador"
            profile, // Ej: "Frontend Developer"
            joined_at: new Date(),
            status: 'Activo',
        };

        const result = await db.collection('projects_teams').insertOne(newTeamMember);
        return result;
    } catch (error) {
        throw new Error(`Error al agregar al miembro del equipo: ${error.message}`);
    }
};

// Obtener a los miembros activos de un proyecto
const getActiveProjectMembers = async (projectId) => {

    try {
        await client.connect();

        const activeMembers = await db.collection('projects_teams')
            .find({ project_id: new ObjectId(projectId), status: 'Activo' })
            .toArray();

        const memberIds = activeMembers.map(org => org.user_id);

        // Realizar consulta en la colección 'users' para obtener los datos de los miembros
        const memberDetails = await db.collection('users')
            .find({ _id: { $in: memberIds } })
            .toArray();

        // Combinar los datos de ambas colecciones
        const enrichedMembers = activeMembers.map(org => {
            const userDetail = memberDetails.find(user => user._id.equals(org.user_id));
            return {
                ...org,
                name: userDetail?.name,
                last_name: userDetail?.last_name,
                username: userDetail?.username,
                bio: userDetail?.bio,
                location: userDetail?.location,
                profile_pic: userDetail?.profile_pic,
            };
        });

        return enrichedMembers;
    } catch (error) {
        throw new Error('Error al obtener los miembros activos: ' + error.message);
    }
};

// Obtener a los organizadores de un proyecto
const getProjectOrganizers = async (projectId) => {

    try {
        await client.connect();

        // Obtener organizadores del proyecto
        const organizers = await db.collection('projects_teams')
            .find({ project_id: new ObjectId(projectId), role: 'Organizador' })
            .toArray();

        const organizerIds = organizers.map(org => org.user_id);

        // Realizar consulta en la colección 'users' para obtener los datos de los organizadores
        const organizerDetails = await db.collection('users')
            .find({ _id: { $in: organizerIds } })
            .toArray();

        // Combinar los datos de ambas colecciones
        const enrichedOrganizers = organizers.map(org => {
            const userDetail = organizerDetails.find(user => user._id.equals(org.user_id));
            return {
                ...org,
                name: userDetail?.name,
                last_name: userDetail?.last_name,
                username: userDetail?.username,
                bio: userDetail?.bio,
                location: userDetail?.location,
                profile_pic: userDetail?.profile_pic,
            };
        });

        return enrichedOrganizers;
    } catch (error) {
        throw new Error(`Error al obtener los organizadores del proyecto: ${error.message}`);
    }
};

// Verificar si un usuario ya está en el equipo de un proyecto
const isUserInTeam = async (projectId, userId) => {

    try {
        const member = await db.collection('projects_teams').findOne({
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId),
        });

        return !!member; // Retorna `true` si es miembro, `false` si no lo es
    } catch (error) {
        throw new Error('Error al verificar si el usuario está en el equipo: ' + error.message);
    }
};

// Verificar si un usuario ya está en el equipo de un proyecto
const getUserRoleInProject = async (projectId, userId) => {

    try {
        await client.connect();

        const member = await db.collection('projects_teams').findOne({
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId)
        });

        return member;
    } catch (error) {
        throw new Error(`Error al obtener el rol del usuario: ${error.message}`);
    }
};

// Verificar si un usuario es organizador de un proyecto
const checkIfOrganizer = async (projectId, userId) => {

    try {
        await client.connect();

        const organizer = await db.collection('projects_teams').findOne({
            project_id: new ObjectId(projectId),
            user_id: new ObjectId(userId),
            role: 'Organizador',
            status: 'Activo'
        });

        return organizer; // Devuelve null si no es organizador
    } catch (error) {
        throw new Error('Error al verificar el rol de organizador: ' + error.message);
    }
};

// Eliminar a un usuario del equipo de un proyecto
const removeUserFromProject = async (projectId, userId) => {

    try {
        await client.connect();

        const result = await db.collection('projects_teams').findOneAndUpdate(
            {
                project_id: new ObjectId(projectId),
                user_id: new ObjectId(userId),
                status: 'Activo'
            },
            {
                $set:
                {
                    status: 'Inactivo',
                    left_at: new Date()
                }
            },
            { returnDocument: 'after' }
        );

        return result; // Retorna el documento actualizado
    } catch (error) {
        throw new Error('Error al remover al usuario del proyecto: ' + error.message);
    }
};

export {
    addMemberToProjectTeam,
    getActiveProjectMembers,
    getProjectOrganizers,
    isUserInTeam,
    getUserRoleInProject,
    checkIfOrganizer,
    removeUserFromProject
}