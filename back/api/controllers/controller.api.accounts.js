import * as service from "../../services/accounts.services.js";
import * as tokenService from "../../services/token.services.js";

//Crear cuenta
const createAccount = async (req, res) => {

    try {
        await service.createAccount(req.body);
        res.status(201).json({ message: "Cuenta creada con éxito." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

//Iniciar sesión
const login = async (req, res) => {

    return service.login(req.body)

        .then(async (account) => {
            return { token: await tokenService.createToken(account), account }
        })
        .then((auth) =>
            res.status(200).json(auth)
        )

        .catch((error) => res.status(404).json({ message: error.message }))

}

//Cerrar sesión
const logout = async (req, res) => {

    const token = req.headers["auth-token"];

    return tokenService
        .removeToken(token)
        .then(() => {
            res.status(200).json({ message: "Sesión cerrada con éxito" });
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });

}


export {
    createAccount,
    login,
    logout
}