import { Router } from 'express';
import * as controllers from '../controllers/controller.api.notifications.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
const route = Router();

// Obtener todas las notificaciones de un usuario
route.get('/users/:userId/notifications', [validateTokenMiddleware], controllers.getUserNotifications);

// Crear una notificación
route.post('/notifications', [validateTokenMiddleware], controllers.createNotification);

// Marcar todas las notificaciones de un usuario como leídas
route.patch('/notifications/:userId/read-all', [validateTokenMiddleware], controllers.markAllNotificationsAsRead);

export default route;