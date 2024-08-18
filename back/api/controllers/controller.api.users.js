import * as service from "../../services/users.services.js";

//Obtener todos los usuarios
const getUsers = (req, res) => {

    service.getUsers()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json();
        });

};

//Obtener un usuario en especifico por ID
const getUserById = (req, res) => {

    const id = req.params.id;

    service.getUserById(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json();
            }
        });

};

//Obtener un usuario en especifico por username
async function getUserByUsername(req, res) {
    const { username } = req.params;
    try {
        const user = await service.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Verificar si ya existe un usuario con el mismo username
const checkUsernameAvailability = async (req, res) => {
    try {
        const isAvailable = await service.isUsernameAvailable(req.body.username);
        res.status(200).json({ isAvailable });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Obtener el perfil del usuario que inició sesión
const getUserProfile = (req, res) => {

    return service.getUserById(req.account._id)
        .then(profile => res.status(200).json(profile))
        .catch(err => res.status(400).json({ message: err.message }))

}

//Completar y agregar todos los datos del onboarding al perfil del usuario
const completeOnboarding = async (req, res) => {
    try {
        const { userId, onboardingData } = req.body;
        await service.completeOnboarding(userId, onboardingData);
        res.status(200).json({ message: '¡El onboarding fue completado con éxito!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Editar un usuario en especifico (SIN USAR)
// const editUser = (req, res) => {

//     const id = req.params.id;

//     service.editUser(id, req.body)
//         .then((editedUser) => {
//             if (editedUser) {
//                 res.status(200).json(editedUser);
//             } else {
//                 res.status(404).json();
//             }
//         });

// }

//Editar los datos de la cuenta
async function updateUserAccountData(req, res) {

    const { userId, newEmail, newUsername } = req.body;

    try {

        if (newEmail) {
            await service.checkIfEmailExists(newEmail);
        }

        if (newUsername) {
            await service.isUsernameAvailable(newUsername);
        }

        await service.updateUserAccountData(userId, newEmail, newUsername);

        res.status(200).json({ message: 'Datos de la cuenta actualizados con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//Editar las preferencias del usuario
async function updateUserPreferencesData(req, res) {

    const { userId, preferences } = req.body;

    try {
        await service.updateUserPreferencesData(userId, preferences);
        res.status(200).json({ message: 'Preferencias actualizadas con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export {
    getUsers,
    getUserById,
    getUserByUsername,
    checkUsernameAvailability,
    getUserProfile,
    completeOnboarding,
    // editUser,
    updateUserAccountData,
    updateUserPreferencesData
}