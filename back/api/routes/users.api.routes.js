import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/controller.api.users.js';
import { validateUserPatch, validateOnboarding } from '../../middleware/users.validate.middleware.js'
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

//Obtener un usuario en especifico por username
route.get('/users/username/:username', controllers.getUserByUsername);

//Verificar si ya existe un usuario con el mismo username
route.post('/users/check-username', controllers.checkUsernameAvailability);

//Obtener el perfil del usuario que inició sesión (SIN USAR)
route.get("/user/profile", [validateTokenMiddleware], controllers.getUserProfile)

//Completar y agregar todos los datos del onboarding al perfil del usuario
route.post('/users/complete-onboarding', [validateTokenMiddleware, validateOnboarding], controllers.completeOnboarding);

//Editar un usuario en especifico (SIN USAR)
// route.patch('/users/:id', [validateUserPatch], controllers.editUser);

//Editar los datos de la cuenta
route.patch('/users/account', [verifyUserOwnership], controllers.updateUserAccountData);

//Editar las preferencias del usuario
route.patch('/users/preferences', [verifyUserOwnership], controllers.updateUserPreferencesData);

// Editar el link al portfolio
route.patch('/users/portfolio', [verifyUserOwnership], controllers.updateUserPortfolioData);

// Editar los datos de contacto
route.patch('/users/socials', [verifyUserOwnership], controllers.updateUserSocialsData);

/*Editar los datos personales*/
// Subir la foto de perfil
route.patch('/users/profile-photo', [validateTokenMiddleware, upload.single('profilePhoto')], controllers.updateUserProfilePhotoData);

// Editar los datos personales
route.patch('/users/personal-profile', [verifyUserOwnership], controllers.updateUserPersonalProfileData);

// Eliminar la foto de perfil
route.delete('/users/profile-photo', [verifyUserOwnership], controllers.deleteProfilePhoto);

export default route;