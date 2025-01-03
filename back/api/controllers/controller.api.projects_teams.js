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

// Obtener a todos los miembros de un proyecto, independientemente de su estado
const getAllProjectMembers = async (req, res) => {

    const { projectId } = req.params;

    try {
        const members = await service.getAllProjectMembers(projectId);

        if (!members || members.length === 0) {
            return res.status(404).json({ message: 'No se encontraron miembros para este proyecto.' });
        }

        return res.status(200).json(members);
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

// Obtener proyectos finalizados en común con otro usuario
const getSharedCompletedProjects = async (req, res) => {

    const { reviewedUserId } = req.params;
    const viewerId = req.account._id;

    try {
        const sharedProjects = await service.getSharedCompletedProjects(viewerId, reviewedUserId);

        if (sharedProjects.length === 0) {
            return res.status(404).json({
                message: 'No hay proyectos finalizados en los que ambos hayan colaborado.'
            });
        }

        res.status(200).json(sharedProjects);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los proyectos compartidos: ${error.message}` });
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

// Eliminar a un usuario del equipo de un proyecto
const removeUserFromProject = async (req, res) => {

    const { projectId, userId } = req.params;

    try {
        const removedUser = await service.removeUserFromProject(projectId, userId);

        if (!removedUser) {
            return res.status(404).json({ message: 'El usuario no forma parte del equipo de este proyecto.' });
        }

        return res.status(200).json({
            message: 'Usuario eliminado del proyecto con éxito.',
            removedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al remover al usuario del proyecto: ${error.message}`
        });
    }
};

// Abandonar el equipo de un proyecto
const leaveProject = async (req, res) => {

    const { projectId } = req.params;
    const { userId } = req.body;

    try {
        const removedUser = await service.removeUserFromProject(projectId, userId);

        if (!removedUser) {
            return res.status(404).json({ message: 'No eres parte de este proyecto o ya lo has abandonado.' });
        }

        return res.status(200).json({
            message: 'Has abandonado el proyecto con éxito.',
            removedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al abandonar el proyecto: ${error.message}`
        });
    }
};

export {
    addMemberToProjectTeam,
    getActiveProjectMembers,
    getAllProjectMembers,
    getProjectOrganizers,
    getSharedCompletedProjects,
    isUserInTeam,
    getUserRoleInProject,
    removeUserFromProject,
    leaveProject
}