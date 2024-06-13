import { personalProjectSchemaCreate, openSourceProjectSchemaCreate, personalProjectSchemaPatch, openSourceProjectSchemaPatch } from '../schemas/projects.schema.js'

//Crear
function validatePersonalProjectCreate(req, res, next) {

    personalProjectSchemaCreate.validate(req.body, { abortEarly: false })
        .then((project) => {
            req.body = project
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateOpenSourceProjectCreate(req, res, next) {

    openSourceProjectSchemaCreate.validate(req.body, { abortEarly: false })
        .then((project) => {
            req.body = project
            next()
        })
        .catch((error) => res.status(500).json(error))
}

//Editar
function validatePersonalProjectPatch(req, res, next) {

    personalProjectSchemaPatch.validate(req.body, { abortEarly: false })
        .then((project) => {
            req.body = project
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateOpenSourceProjectPatch(req, res, next) {

    openSourceProjectSchemaPatch.validate(req.body, { abortEarly: false })
        .then((project) => {
            req.body = project
            next()
        })
        .catch((error) => res.status(500).json(error))
}

export {
    validatePersonalProjectCreate,
    validateOpenSourceProjectCreate,
    validatePersonalProjectPatch,
    validateOpenSourceProjectPatch
}