import { Router } from 'express';
import * as controllers from '../controllers/controller.api.users.js';
import { validateUserCreate, validateUserPatch, validateOnboarding } from '../../middleware/users.validate.middleware.js'
import { validateTokenMiddleware, verifyUserOwnership } from "../../middleware/token.validate.middleware.js"

const route = Router();

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

export default route;