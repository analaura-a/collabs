import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_requests.js';
import { validateRequestCreate, validateRequestEdit } from '../../middleware/projects_requests.validate.middleware.js'

const route = Router();

/* API POSTULACIONES DE PROYECTOS */
//Obtener las postulaciones de un proyecto en particular
route.get('/projects/:id/requests', controllers.getRequestsByProjectId);

//Obtener las postulaciones enviadas por un usuario en particular
route.get('/users/:id/requests', controllers.getRequestsByUserId);

//Agregar una nueva postulación
route.post('/project_requests', [validateRequestCreate], controllers.createRequest);

//Editar una postulación
route.patch('/project_requests/:id', [validateRequestEdit], controllers.editRequest);

//Eliminar una postulación
route.delete('/project_requests/:id', controllers.deleteRequest);

export default route;