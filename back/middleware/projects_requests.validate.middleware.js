import { requestSchemaCreate, requestSchemaPatch } from '../schemas/projects_requests.schema.js'

function validateRequestCreate(req, res, next) {

    requestSchemaCreate.validate(req.body, { abortEarly: false })
        .then((request) => {
            req.body = request
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateRequestEdit(req, res, next) {

    requestSchemaPatch.validate(req.body, { abortEarly: false })
        .then((request) => {
            req.body = request
            next()
        })
        .catch((error) => res.status(500).json(error))
}

export {
    validateRequestCreate,
    validateRequestEdit
}