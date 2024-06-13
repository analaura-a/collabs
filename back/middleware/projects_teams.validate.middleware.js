import { teamSchemaCreate, teamSchemaPatch, teamMemberSchemaPatch } from '../schemas/projects_teams.schema.js'

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

export {
    validateTeamCreate,
    validateTeamPatch,
    validateTeamMemberPatch
}