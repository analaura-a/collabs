import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as service from "../../services/users.services.js";
import * as accountService from "../../services/accounts.services.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Obtener todos los usuarios
const getUsers = (req, res) => {

    service.getUsers()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json(error);
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
                res.status(404).json({ message: error.message });
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

// Editar el link al portfolio
const updateUserPortfolioData = async (req, res) => {

    const { userId, portfolioLink } = req.body;

    try {
        await service.updateUserPortfolioData(userId, portfolioLink);
        res.status(200).json({ message: 'Portfolio actualizado con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar los datos de contacto
async function updateUserSocialsData(req, res) {

    const { userId, socials } = req.body;

    try {
        await service.updateUserSocialsData(userId, socials);
        res.status(200).json({ message: 'Datos de contacto actualizados con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Subir la foto de perfil
const updateUserProfilePhotoData = async (req, res) => {

    try {
        const profilePhotoUrl = `/uploads/${req.file.filename}`;
        const updatedUser = await service.updateUserProfilePhotoData(req.account._id, profilePhotoUrl);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error desconocido al subir la imagen.' });
    }
};

// Editar los datos personales
const updateUserPersonalProfileData = async (req, res) => {

    const { userId, name, last_name, location, bio } = req.body;

    try {
        await service.updateUserPersonalProfileData(userId, { name, last_name, location, bio });
        await accountService.updatePersonalProfileData(userId, { name, last_name });
        res.status(200).json({ message: 'Datos personales actualizados con éxito.' });
    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el perfil.' });
    }
};

// Eliminar la foto de perfil
const deleteProfilePhoto = async (req, res) => {

    const { userId } = req.body;

    try {
        // 1. Eliminar la referencia de la foto en la base de datos y obtener la ruta del archivo
        const user = await service.deleteProfilePhoto(userId);

        if (!user || !user.profile_pic) {
            return res.status(404).json({ message: 'Foto de perfil no encontrada.' });
        }

        // 2. Generar la ruta completa al archivo en el servidor
        const profilePhotoPath = path.join(__dirname, '../..', user.profile_pic);

        // 3. Eliminar el archivo del servidor
        fs.unlink(profilePhotoPath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Ocurrió un error al eliminar la imagen del servidor.' });
            }

            res.status(200).json({ message: 'Foto de perfil eliminada con éxito.' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Ocurrió un error al eliminar la foto de perfil.' });
    }
};

// Editar los roles profesionales
const updateUserRoles = async (req, res) => {

    const { userId, roles } = req.body;

    try {
        const updatedUser = await service.updateUserRoles(userId, roles);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar las skills
const updateUserSkills = async (req, res) => {

    const { userId, skills } = req.body;

    try {
        const updatedUser = await service.updateUserSkills(userId, skills);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar el nivel de experiencia
const updateUserExperienceLevel = async (req, res) => {

    const { userId, experience_level } = req.body;

    try {
        const updatedUser = await service.updateUserExperienceLevel(userId, experience_level);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Editar la disponibilidad
const updateUserAvailability = async (req, res) => {

    const { userId, availability } = req.body;

    try {
        const updatedUser = await service.updateUserAvailability(userId, availability);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar la cuenta
const deleteAccount = async (req, res) => {

    const { id: userId } = req.params;

    try {
        await service.deleteAccount(userId);
        res.status(200).json({ message: 'Cuenta eliminada con éxito.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    getUsers,
    getUserById,
    getUserByUsername,
    checkUsernameAvailability,
    getUserProfile,
    completeOnboarding,
    // editUser,
    updateUserAccountData,
    updateUserPreferencesData,
    updateUserPortfolioData,
    updateUserSocialsData,
    updateUserProfilePhotoData,
    updateUserPersonalProfileData,
    deleteProfilePhoto,
    updateUserRoles,
    updateUserSkills,
    updateUserExperienceLevel,
    updateUserAvailability,
    deleteAccount
}