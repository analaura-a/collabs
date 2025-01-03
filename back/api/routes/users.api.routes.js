import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/controller.api.users.js';
import { validateOnboarding } from '../../middleware/users.validate.middleware.js'
import { validateTokenMiddleware, verifyUserOwnership } from "../../middleware/token.validate.middleware.js"

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

/* API PERFIL DE USUARIO */
//Obtener todos los usuarios
route.get('/users', controllers.getUsers);

//Obtener un usuario en especifico por ID
route.get('/users/:id', controllers.getUserById);

// Eliminar la cuenta
route.delete('/user/:id', [verifyUserOwnership], controllers.deleteAccount);

//Obtener un usuario en especifico por username
route.get('/users/username/:username', controllers.getUserByUsername);

// Obtener estadísticas de colaboración del usuario
route.get('/users/:userId/collaboration-stats', [validateTokenMiddleware], controllers.getUserCollaborationStats);

//Verificar si ya existe un usuario con el mismo username
route.post('/users/check-username', controllers.checkUsernameAvailability);

//Completar y agregar todos los datos del onboarding al perfil del usuario
route.post('/users/complete-onboarding', [validateTokenMiddleware, validateOnboarding], controllers.completeOnboarding);

//Editar los datos de la cuenta
route.patch('/users/account', [verifyUserOwnership], controllers.updateUserAccountData);

//Editar las preferencias del usuario
route.patch('/users/preferences', [verifyUserOwnership], controllers.updateUserPreferencesData);

// Editar el link al portfolio
route.patch('/users/portfolio', [verifyUserOwnership], controllers.updateUserPortfolioData);

// Editar los datos de contacto
route.patch('/users/socials', [verifyUserOwnership], controllers.updateUserSocialsData);

// Subir la foto de perfil
route.patch('/users/profile-photo', [validateTokenMiddleware, upload.single('profilePhoto')], controllers.updateUserProfilePhotoData);

// Editar los datos personales
route.patch('/users/personal-profile', [verifyUserOwnership], controllers.updateUserPersonalProfileData);

// Eliminar la foto de perfil
route.delete('/users/profile-photo', [verifyUserOwnership], controllers.deleteProfilePhoto);

// Editar los roles profesionales
route.patch('/users/professional-profile/roles', [verifyUserOwnership], controllers.updateUserRoles);

// Editar las skills
route.patch('/users/professional-profile/skills', [verifyUserOwnership], controllers.updateUserSkills);

// Editar el nivel de experiencia
route.patch('/users/professional-profile/experience', [verifyUserOwnership], controllers.updateUserExperienceLevel);

// Editar la disponibilidad
route.patch('/users/professional-profile/availability', [verifyUserOwnership], controllers.updateUserAvailability);

export default route;