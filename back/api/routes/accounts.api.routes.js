import { Router } from 'express';
import * as controllers from '../controllers/controller.api.accounts.js';
import { validateAccountCreate, validateAccount } from '../../middleware/accounts.validate.middleware.js'

const route = Router();

/* API CUENTAS DE USUARIO */
//Agregar una nueva cuenta
route.post('/auth/signup', [validateAccountCreate], controllers.createAccount);

//Iniciar sesión
route.post('/auth/login', [validateAccount], controllers.login);

//Cerrar sesión
route.delete('/auth/logout', controllers.logout);

export default route;