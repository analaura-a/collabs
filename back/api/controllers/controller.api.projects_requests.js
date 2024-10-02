import * as service from "../../services/projects_requests.services.js";
import * as teamService from "../../services/projects_teams.services.js"

//Obtener las postulaciones de un proyecto en particular
const getRequestsByProjectId = async (req, res) => {

    const { projectId } = req.params;

    try {
        const requests = await service.getRequestsByProjectId(projectId);

        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: 'No hay postulaciones para este proyecto.' });
        }

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({
            message: `Error al obtener las postulaciones del proyecto: ${error.message}`,
        });
    }
}

//Obtener las postulaciones de un usuario en particular
const getRequestsByUserId = async (req, res) => {

    const { userId } = req.params;

    try {
        const requests = await service.getRequestsByUserId(userId);

        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: 'No se encontraron postulaciones para este usuario.' });
        }

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error al obtener las postulaciones del usuario.' });
    }
};

//Agregar una nueva postulación
const createRequest = async (req, res) => {

    const { userId, projectId, appliedRole, openPositionId } = req.body;

    try {
        const request = await service.createRequest({ userId, projectId, appliedRole, openPositionId });

        return res.status(201).json({
            message: 'Postulación enviada con éxito.',
            request
        });
    } catch (error) {
        if (error.message.includes('Ya te has postulado')) {
            return res.status(409).json({
                message: error.message
            });
        }
        return res.status(400).json({
            message: 'Error al crear la postulación.',
            error: error.message
        });
    }
};

//Aceptar una postulación
const acceptProjectRequest = async (req, res) => {

    const { id } = req.params;
    const { projectId, userId, appliedRole } = req.body;

    try {
        // Cambiar el estado de la postulación 
        const updatedRequest = await service.acceptProjectRequest(id);

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Postulación no encontrada.' });
        }

        // Agregar al usuario al equipo del proyecto
        await teamService.addMemberToProjectTeam({
            projectId,
            userId,
            role: 'Colaborador',
            profile: appliedRole
        });

        // Declinar las otras postulaciones del mismo usuario para este proyecto
        await service.declineOtherRequests({
            projectId,
            userId,
            excludeRequestId: id
        });

        return res.status(200).json({
            message: 'Postulación aceptada y usuario agregado al equipo del proyecto.',
            updatedRequest
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al aceptar la postulación: ${error.message}`
        });
    }
};

//Declinar una postulación
const declineProjectRequest = async (req, res) => {

    const { id } = req.params;

    try {
        const updatedRequest = await service.declineProjectRequest(id);

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Postulación no encontrada.' });
        }

        return res.status(200).json({
            message: 'Postulación declinada con éxito.',
            updatedRequest
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al declinar la postulación: ${error.message}`
        });
    }
};

//Eliminar una postulación
const deleteRequest = async (req, res) => {

    const { id } = req.params; // ID de la postulación
    const { userId } = req.body; // ID del usuario, necesario para el middleware

    try {
        // Verificar que el estado de la postulación sea "Pendiente"
        const request = await service.getRequestById(id);

        if (!request) {
            return res.status(404).json({ message: 'Postulación no encontrada.' });
        }

        if (request.status !== 'Pendiente') {
            return res.status(400).json({ message: 'Solo puedes cancelar postulaciones pendientes.' });
        }

        // Eliminar la postulación
        await service.deleteRequest(id);
        res.status(200).json({ message: 'Postulación cancelada con éxito.' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Ocurrió un error al cancelar la postulación.' });
    }
};

export {
    getRequestsByProjectId,
    getRequestsByUserId,
    createRequest,
    acceptProjectRequest,
    declineProjectRequest,
    deleteRequest
}
