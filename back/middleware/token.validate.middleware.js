import * as tokenService from '../services/token.services.js'

async function validateTokenMiddleware(req, res, next) {

    const token = req.headers["auth-token"]

    if (!token) {
        return res.status(401).json({ error: { message: "No se envió el token, acceso no autorizado." } })
    }

    try {

        const account = await tokenService.validateToken(token)

        if (!account) {
            return res.status(401).json({ error: { message: "Token inválido, acceso no autorizado." } })
        }

        req.account = account;

        next()

    } catch (err) {
        return res.status(401).json({ error: { message: "Token inválido, acceso no autorizado." } });
    }

}

const verifyUserOwnership = async (req, res, next) => {

    const token = req.headers['auth-token'];

    if (!token) {
        return res.status(401).json({ message: "No se envió el token, acceso no autorizado." });
    }

    try {

        const user = await tokenService.validateToken(token)
        if (!user) {
            return res.status(401).json({ message: "Token inválido, acceso no autorizado." })
        }
        req.user = user;

        // Verificar que el userId en la solicitud coincida con el del token
        const { userId } = req.body;
        if (req.user._id !== userId) {
            return res.status(403).json({ message: "Acceso denegado, no puedes editar esta información." });
        }

        next();

    } catch (error) {
        res.status(400).json({ message: "Token inválido o no autorizado" });
    }
};

export {
    validateTokenMiddleware,
    verifyUserOwnership
}