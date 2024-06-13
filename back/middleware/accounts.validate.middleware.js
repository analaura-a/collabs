import { accountSchemaCreate, accountSchemaLogin } from '../schemas/accounts.schema.js'

function validateAccountCreate(req, res, next) {

    return accountSchemaCreate.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((account) => {
            req.body = account
            next()
        })
        .catch((error) => res.status(500).json(error))
}

function validateAccount(req, res, next) {

    return accountSchemaLogin.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then((account) => {
            req.body = account
            next()
        })
        .catch((error) => res.status(500).json(error))
}

export {
    validateAccountCreate,
    validateAccount
}