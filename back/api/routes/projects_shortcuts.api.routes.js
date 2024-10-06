import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_shortcuts.js';
import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js';
import { verifyTeamMember } from '../../middleware/projects_teams.validate.middleware.js';

const route = Router();

/* API ATAJOS RÁPIDOS */
// Obtener los atajos de un proyecto
route.get('/projects/:projectId/shortcuts', [validateTokenMiddleware, verifyTeamMember], controllers.getProjectShortcuts);

// Crear un nuevo atajo
route.post('/project_shortcuts', [validateTokenMiddleware, verifyTeamMember], controllers.createProjectShortcut);

export default route;