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

export {
    validateTokenMiddleware
}