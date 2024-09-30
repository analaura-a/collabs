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

// Obtener a los miembros activos de un proyecto
const getActiveProjectMembers = async (req, res) => {

    const { projectId } = req.params;

    try {
        const activeMembers = await service.getActiveProjectMembers(projectId);

        if (!activeMembers || activeMembers.length === 0) {
            return res.status(404).json({ message: 'No se encontraron miembros activos para este proyecto.' });
        }

        return res.status(200).json(activeMembers);
    } catch (error) {
        return res.status(500).json({
            message: `Error al obtener los miembros activos del proyecto: ${error.message}`
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

// Verificar si un usuario ya está en el equipo de un proyecto
const isUserInTeam = async (req, res) => {

    const { projectId, userId } = req.params;

    try {
        const isMember = await service.isUserInTeam(projectId, userId);

        if (isMember) {
            return res.status(200).json({ isMember: true });
        } else {
            return res.status(200).json({ isMember: false });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar si el usuario está en el equipo', error: error.message });
    }
};

// Verificar si un usuario ya está en el equipo de un proyecto
const getUserRoleInProject = async (req, res) => {

    const { projectId, userId } = req.params;

    try {
        const member = await service.getUserRoleInProject(projectId, userId);

        if (!member) {
            return res.status(404).json({ message: 'El usuario no se encuentra en el equipo de ese proyecto.' });
        }

        return res.status(200).json({
            role: member.role
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el rol del usuario en el proyecto.',
            error: error.message
        });
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