import { Router } from 'express';
import * as controllers from '../controllers/controller.api.messages.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
const route = Router();

/* API MENSAJES DE CHATS */
// Enviar un mensaje en un chat
route.post('/messages', [validateTokenMiddleware], controllers.sendMessage);

// Obtener mensajes de un chat
route.get('/chats/:chatId/messages', [validateTokenMiddleware], controllers.getChatMessages);

export default route;