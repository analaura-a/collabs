import { userSchemaCreate, userSchemaPatch } from '../schemas/users.schema.js'

function validateUserCreate(req, res, next) {

    userSchemaCreate.validate(req.body, { abortEarly: false })
        .then((user) => {
            req.body = user
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateUserPatch(req, res, next) {
    userSchemaPatch.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((user) => {
            req.body = user
            next()
        })
        .catch((error) => res.status(500).json(error))
}


export {
    validateUserCreate,
    validateUserPatch
}