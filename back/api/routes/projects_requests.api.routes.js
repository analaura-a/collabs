import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_requests.js';
// import { validateRequestCreate, validateRequestEdit } from '../../middleware/projects_requests.validate.middleware.js'
import { verifyUserOwnership } from '../../middleware/token.validate.middleware.js';

const route = Router();

/* API POSTULACIONES DE PROYECTOS */
// {
//     _id: ObjectId, // ID único de la postulación
//     project_id: ObjectId, // ID del proyecto al que se postuló
//     user_id: ObjectId, // ID del usuario que se postuló
//     open_position_id: ObjectId, // ID específico de la posición abierta
//     role: String, // Rol al que se postuló (ej. "UX/UI Designer")
//     status: String, // Estado de la postulación ("pendiente", "aprobada", "declinada")
//     created_at: Date // Fecha en que se creó la postulación
//   }


// //Obtener las postulaciones de un proyecto en particular
// route.get('/projects/:id/requests', controllers.getRequestsByProjectId);

// //Obtener las postulaciones de un usuario en particular
// route.get('/users/:id/requests', controllers.getRequestsByUserId);

//Agregar una nueva postulación
route.post('/project_requests', [verifyUserOwnership], controllers.createRequest);

// //Editar una postulación
// route.patch('/project_requests/:id', [validateRequestEdit], controllers.editRequest);

// //Eliminar una postulación
// route.delete('/project_requests/:id', controllers.deleteRequest);

export default route;