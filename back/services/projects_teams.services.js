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
    addMemberToProjectTeam
    // getTeamByProjectId,
    // createTeam,
    // editTeam,
    // addMemberToTeam,
    // deleteTeam
}