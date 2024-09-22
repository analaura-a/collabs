import * as service from "../../services/projects_teams.services.js";

// Agregar miembro al equipo de un proyecto
const addMemberToProjectTeam = async (req, res) => {

    const { projectId, userId, role, profile } = req.body;

    try {
        const teamMember = await service.addMemberToProjectTeam({
            projectId,
            userId,
            role,
            profile,
        });

        return res.status(201).json({
            message: `${role} añadido al equipo con éxito`,
            teamMember,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error al agregar el miembro al equipo',
            error: error.message,
        });
    }
};

// Obtener a los organizadores de un proyecto
const getProjectOrganizers = async (req, res) => {

    const { projectId } = req.params;

    try {
        const organizers = await service.getProjectOrganizers(projectId);
        return res.status(200).json(organizers);
    } catch (error) {
        return res.status(400).json({ message: `Error al obtener los organizadores del proyecto: ${error.message}` });
    }
};

// //Obtener el equipo de un proyecto en particular
// const getTeamByProjectId = (req, res) => {

//     const id = req.params.id;

//     service.getTeamByProjectId(id)
//         .then((team) => {
//             if (team) {
//                 res.status(200).json(team);
//             } else {
//                 res.status(404).json();
//             }
//         });

// }

// //Crear un nuevo equipo
// const createTeam = async (req, res) => {

//     try {

//         service
//             .createTeam(req.body)
//             .then((newTeam) => {
//                 res.status(201).json(newTeam);
//             })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json();
//     }

// }

// //Editar un equipo
// const editTeam = async (req, res) => {

//     const id = req.params.id;

//     service.editTeam(id, req.body)
//         .then((editedTeam) => {
//             if (editedTeam) {
//                 res.status(200).json(editedTeam);
//             } else {
//                 res.status(404).json();
//             }
//         });

// }

// //Agregar miembro a un equipo particular
// const addMemberToTeam = (req, res) => {

//     const projectId = req.params.id;
//     const newMember = req.body;

//     service.addMemberToTeam(projectId, newMember)

//         .then((editedTeam) => {
//             if (editedTeam) {
//                 res.status(200).json(editedTeam);
//             } else {
//                 res.status(404).json();
//             }
//         });

// }

// //Eliminar un equipo
// const deleteTeam = (req, res) => {

//     const id = req.params.id;

//     service
//         .deleteTeam(id)
//         .then(() => {
//             res.status(204).json();
//         })
//         .catch((error) => res.status(500).json());

// }


export {
    addMemberToProjectTeam,
    getProjectOrganizers
    // getTeamByProjectId,
    // createTeam,
    // editTeam,
    // addMemberToTeam,
    // deleteTeam
}