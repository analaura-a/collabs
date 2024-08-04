import { userSchemaCreate, userSchemaPatch, OnboardingSchema } from '../schemas/users.schema.js'

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

const validateOnboarding = async (req, res, next) => {
    // console.log('Datos recibidos para validación:', req.body);
    try {
        await OnboardingSchema.validate(req.body, { abortEarly: false });
        // console.log('Validación exitosa');
        next();
    } catch (error) {
        // console.error('Errores de validación:', error.errors);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
};

export {
    validateUserCreate,
    validateUserPatch,
    validateOnboarding
}