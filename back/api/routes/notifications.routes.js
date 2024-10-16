import { Router } from 'express';
import * as controllers from '../controllers/controller.api.notifications.js';
import { verifyUserOwnership, validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
const route = Router();

// Crear una notificación
route.post('/notifications', [validateTokenMiddleware], controllers.createNotification);

export default route;