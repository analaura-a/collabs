import { Router } from 'express';
import * as controllers from '../controllers/controller.api.projects_teams.js';
import { verifyUserOwnership } from '../../middleware/token.validate.middleware.js';
// import { validateTeamCreate, validateTeamPatch, validateTeamMemberPatch } from '../../middleware/projects_teams.validate.middleware.js'
// import { validateTokenMiddleware } from '../../middleware/token.validate.middleware.js'

const route = Router();

/* API EQUIPOS DE PROYECTOS */
// Agregar miembro al equipo de un proyecto
route.post('/project_teams', [verifyUserOwnership], controllers.addMemberToProjectTeam);

// //Obtener el equipo de un proyecto en particular
// route.get('/projects/:id/team', [validateTokenMiddleware], controllers.getTeamByProjectId);

// //Agregar un nuevo equipo
// route.post('/project_teams', [validateTokenMiddleware, validateTeamCreate], controllers.createTeam);

// //Editar un equipo
// route.patch('/project_teams/:id', [validateTeamPatch], controllers.editTeam);

// //Agregar miembro a un equipo particular
// route.patch('/projects/:id/team', [validateTeamMemberPatch], controllers.addMemberToTeam);

// //Eliminar un equipo
// route.delete("/project_teams/:id", controllers.deleteTeam);

export default route;