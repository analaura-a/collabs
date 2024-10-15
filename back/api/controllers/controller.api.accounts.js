import * as service from "../../services/accounts.services.js";
import * as tokenService from "../../services/token.services.js";
import * as userService from "../../services/users.services.js"

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
            const token = await tokenService.createToken(account);
            const userProfile = await userService.getUserById(account._id);
            return { token, userProfile };
        })
        .then((auth) =>
            res.status(200).json(auth)
        )

        .catch((error) => res.status(404).json({ message: error.message }))

}

//Cerrar sesión
const logout = async (req, res) => {

    const token = req.headers["auth-token"];

    try {
        const result = await tokenService.removeToken(token);
        res.status(200).json({ message: result.message });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

}

// Cambiar la contraseña (desde editar mi perfil)
async function changePassword(req, res) {

    const { userId, currentPassword, newPassword } = req.body;

    try {
        await service.changePassword(userId, currentPassword, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Solicitar restablecimiento de contraseña
const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        await service.requestPasswordReset(email);
        res.status(200).json({ message: 'Correo de restablecimiento enviado con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Restablecer la contraseña
const updatePassword = async (req, res) => {

    const { token, password } = req.body;

    try {
        await service.resetPassword(token, password);
        res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    createAccount,
    login,
    logout,
    changePassword,
    forgotPassword,
    updatePassword
}