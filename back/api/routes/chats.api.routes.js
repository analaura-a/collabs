import { Router } from 'express';
import * as controllers from '../controllers/controller.api.chats.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
import { verifyTeamMember } from '../../middleware/projects_teams.validate.middleware.js';
const route = Router();

/* API CHATS */
// Crear un nuevo chat
route.post('/chats', [validateTokenMiddleware], controllers.createChat);

// Obtener todos los chats de un usuario
route.get('/user/chats', [validateTokenMiddleware], controllers.getUserChats);

// Obtener el chat grupal de un proyecto
route.get('/project/:projectId/chat', [validateTokenMiddleware, verifyTeamMember], controllers.getProjectChat);

// Salir de un chat grupal
route.patch('/project/:projectId/chat/leave', [validateTokenMiddleware], controllers.leaveGroupChat);

export default route;