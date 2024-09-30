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

// //Obtener el equipo de un proyecto en particular
// async function getTeamByProjectId(id) {
//     return db.collection("projects_teams").findOne({ project_id: id });
// }

// //Crear un nuevo equipo
// async function createTeam(teamData) {

//     // const user = await getUserProfile()

//     // const createdTeam = {
//     //     ...teamData,
//     //     members: [{
//     //         ...user,
//     //         project_details: {
//     //             role: "Founder",
//     //             profile: "UX/UI Designer",
//     //             active: true
//     //         }
//     //     }]
//     // }

//     const teams = await db.collection("projects_teams").insertOne(teamData);
//     teamData._id = teams.insertedId;
//     return teamData;
// }

// //Editar un equipo
// async function editTeam(id, team) {
//     const editedTeam = await db.collection("projects_teams").updateOne({ _id: new ObjectId(id) }, { $set: team });
//     return editedTeam;
// }

// //Agregar miembro a un equipo particular
// async function addMemberToTeam(projectId, newMember) {

//     const editedTeam = await db.collection("projects_teams").findOneAndUpdate(
//         { project_id: projectId },
//         { $push: { members: newMember } },
//         { returnDocument: 'after' }
//     );
//     return editedTeam;
// }

// //Eliminar un equipo
// async function deleteTeam(id) {
//     const deletedTeam = await db.collection("projects_teams").deleteOne({ _id: new ObjectId(id) })
//     return deletedTeam;
// }

export {
    addMemberToProjectTeam,
    getActiveProjectMembers,
    getProjectOrganizers,
    isUserInTeam,
    getUserRoleInProject
    // getTeamByProjectId,
    // createTeam,
    // editTeam,
    // addMemberToTeam,
    // deleteTeam
}