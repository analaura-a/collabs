import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_reviews.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
import { verifyTeamMember } from '../../middleware/projects_teams.validate.middleware.js';

const route = Router();

/* API RESEÑAS DE PROYECTOS */

// Crear una reseña
route.post('/project-reviews/:projectId', [validateTokenMiddleware, verifyTeamMember], controllers.createReview);

// Editar una reseña
route.patch('/project-reviews/:projectId/:reviewId', [validateTokenMiddleware, verifyTeamMember], controllers.updateReview);

export default route;