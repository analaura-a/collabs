import { Router } from 'express';
import * as controllers from '../controllers/controller.api.accounts.js';
import { validateAccountCreate, validateAccount } from '../../middleware/accounts.validate.middleware.js'
import { verifyUserOwnership } from '../../middleware/token.validate.middleware.js';

const route = Router();

/* API CUENTAS DE USUARIO */
//Agregar una nueva cuenta
route.post('/auth/signup', [validateAccountCreate], controllers.createAccount);

//Iniciar sesión
route.post('/auth/login', [validateAccount], controllers.login);

//Cerrar sesión
route.delete('/auth/logout', controllers.logout);

// Cambiar la contraseña (desde editar mi perfil)
route.patch('/auth/change-password', [verifyUserOwnership], controllers.changePassword);

// Solicitar restablecimiento de contraseña
route.post('/auth/forgot-password', controllers.forgotPassword);

// Restablecer la contraseña con el token
route.post('/auth/reset-password', controllers.updatePassword);

export default route;