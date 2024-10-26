import { Router } from 'express';
import * as controllers from '../controllers/controller.api.chats.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
const route = Router();

/* API CHATS */
// Crear un nuevo chat
route.post('/chats', [validateTokenMiddleware], controllers.createChat);

// Obtener todos los chats de un usuario
route.get('/user/chats', [validateTokenMiddleware], controllers.getUserChats);

export default route;