import { teamSchemaCreate, teamSchemaPatch, teamMemberSchemaPatch } from '../schemas/projects_teams.schema.js'
import * as service from "../services/projects_teams.services.js";

function validateTeamCreate(req, res, next) {

    teamSchemaCreate.validate(req.body, { abortEarly: false })
        .then((team) => {
            req.body = team
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateTeamPatch(req, res, next) {

    teamSchemaPatch.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((team) => {
            req.body = team
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateTeamMemberPatch(req, res, next) {

    teamMemberSchemaPatch.validate(req.body, { abortEarly: false })
        .then((teamMember) => {
            req.body = teamMember
            next()
        })
        .catch((error) => res.status(500).json(error))
}

const verifyOrganizerRole = async (req, res, next) => {

    const { account } = req;
    const projectId = req.params.projectId || req.body.projectId;
    const userId = account._id;

    if (!account || !projectId) {
        return res.status(400).json({
            message: 'Faltan datos para la verificación: usuario o ID del proyecto no proporcionado.'
        });
    }

    try {
        const organizer = await service.checkIfOrganizer(projectId, userId);

        if (!organizer) {
            return res.status(403).json({
                message: 'No tienes permisos para realizar esta acción.'
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            message: `Error al verificar los permisos: ${error.message}`
        });
    }
};

export {
    validateTeamCreate,
    validateTeamPatch,
    validateTeamMemberPatch,
    verifyOrganizerRole
}