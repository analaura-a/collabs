import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_requests.js';
// import { validateRequestCreate, validateRequestEdit } from '../../middleware/projects_requests.validate.middleware.js'
import { verifyUserOwnership, validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
import { verifyOrganizerRole } from '../../middleware/projects_teams.validate.middleware.js';

const route = Router();

/* API POSTULACIONES DE PROYECTOS */

//Obtener las postulaciones de un proyecto en particular
route.get('/projects/:projectId/requests', [validateTokenMiddleware], controllers.getRequestsByProjectId);

//Obtener las postulaciones de un usuario en particular
route.get('/users/:userId/requests', [validateTokenMiddleware], controllers.getRequestsByUserId);

//Agregar una nueva postulación
route.post('/project_requests', [verifyUserOwnership], controllers.createRequest);

//Aceptar una postulación
route.patch('/project_requests/:id/accept', [validateTokenMiddleware, verifyOrganizerRole], controllers.acceptProjectRequest);

//Declinar una postulación
route.patch('/project_requests/:id/decline', [validateTokenMiddleware, verifyOrganizerRole], controllers.declineProjectRequest);

// Declinar todas las postulaciones pendientes de un proyecto
route.patch('/projects/:projectId/decline-pending-requests', [validateTokenMiddleware, verifyOrganizerRole], controllers.declinePendingProjectRequests);

//Eliminar una postulación
route.delete('/project_requests/:id', [verifyUserOwnership], controllers.deleteRequest);

export default route;