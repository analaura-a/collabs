import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/controller.api.projects.js';
import { validateTokenMiddleware, verifyUserOwnership } from '../../middleware/token.validate.middleware.js'
import { verifyOrganizerRole } from "../../middleware/projects_teams.validate.middleware.js"

const route = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/projects');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

/* API PROYECTOS */

//Obtener todos los proyectos abiertos
route.get('/projects/open', controllers.getOpenProjects)

//Obtener un proyecto en particular por ID
route.get('/projects/:id', [validateTokenMiddleware], controllers.getProjectById)

//Obtener todos los proyectos de los que un usuario es miembro activo
route.get('/users/:userId/projects', [validateTokenMiddleware], controllers.getUserProjects);

//Obtener la cantidad de proyectos personales y open-source en los que el usuario colaboró
route.get('/users/:userId/projects-count', [validateTokenMiddleware], controllers.getUserProjectsCount);

//Obtener los últimos 2 proyectos de un usuario
route.get('/users/:userId/last-projects', [validateTokenMiddleware], controllers.getLastTwoProjectsJoinedByUser);

// Obtener los proyectos recomendados para un usuario
route.get('/users/:userId/recommended-projects', [validateTokenMiddleware], controllers.getRecommendedProjectsForUser);

// Obtener los últimos 3 proyectos creados
route.get("/projects/recent/list", controllers.getRecentProjects);

// Crear un nuevo proyecto
route.post('/projects', [verifyUserOwnership], controllers.createProject);

//Subir imagen del proyecto
route.post('/projects/:id/image', [upload.single('projectImage')], controllers.uploadProjectImage);

// Editar los detalles de un proyecto
route.patch('/projects/:id', [validateTokenMiddleware], controllers.updateProjectDetails)

// Editar la convocatoria de un proyecto
route.patch('/projects/:id/open-positions', [validateTokenMiddleware], controllers.updateProjectOpenPositions)

// Cambiar el estado de un proyecto
route.patch('/projects/:projectId/status', [validateTokenMiddleware, verifyOrganizerRole], controllers.updateProjectStatus);

// Eliminar un proyecto
route.delete("/projects/:projectId", [validateTokenMiddleware, verifyOrganizerRole], controllers.deleteProject);

export default route;