import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_teams.js';
import { validateTokenMiddleware, verifyUserOwnership } from '../../middleware/token.validate.middleware.js';
import { verifyOrganizerRole } from '../../middleware/projects_teams.validate.middleware.js';
// import { validateTeamCreate, validateTeamPatch, validateTeamMemberPatch } from '../../middleware/projects_teams.validate.middleware.js'
// import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js'

const route = Router();

/* API MIEMBROS DE PROYECTOS */
// Agregar miembro al equipo de un proyecto
route.post('/project_teams', [validateTokenMiddleware], controllers.addMemberToProjectTeam);

// Obtener a los miembros activos de un proyecto
route.get('/projects/:projectId/active-members', [validateTokenMiddleware], controllers.getActiveProjectMembers);

// Obtener a todos los miembros de un proyecto, independientemente de su estado
route.get('/projects/:projectId/all-members', [validateTokenMiddleware], controllers.getAllProjectMembers);

// Obtener a los organizadores de un proyecto
route.get('/projects/:projectId/organizers', [validateTokenMiddleware], controllers.getProjectOrganizers);

// Obtener proyectos finalizados en común con otro usuario
route.get('/users/:reviewedUserId/shared-projects', [validateTokenMiddleware], controllers.getSharedCompletedProjects);

// Verificar si un usuario ya está en el equipo de un proyecto
route.get('/projects/:projectId/team/check-user/:userId', [validateTokenMiddleware], controllers.isUserInTeam);

// Verificar el rol de un usuario en un proyecto
route.get('/projects/:projectId/user/:userId/role', [validateTokenMiddleware], controllers.getUserRoleInProject);

// Eliminar a un usuario del equipo de un proyecto
route.patch('/projects/:projectId/team/:userId/remove', [validateTokenMiddleware, verifyOrganizerRole], controllers.removeUserFromProject);

// Abandonar el equipo de un proyecto
route.patch('/projects/:projectId/team/leave', [verifyUserOwnership], controllers.leaveProject);

export default route;