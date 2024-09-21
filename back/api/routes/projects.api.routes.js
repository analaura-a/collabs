import { Router } from 'express';
import multer from 'multer';
import * as controllers from '../controllers/controller.api.projects.js';
// import { validatePersonalProjectCreate, validateOpenSourceProjectCreate, validatePersonalProjectPatch, validateOpenSourceProjectPatch } from '../../middleware/projects.validate.middleware.js'
import { validateTokenMiddleware, verifyUserOwnership } from '../../middleware/token.validate.middleware.js'

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
// //Obtener todos los proyectos
// route.get('/projects', controllers.getProjects);

//Obtener todos los proyectos abiertos
route.get('/projects/open', controllers.getOpenProjects)

// //Obtener los proyectos de tipo personal
// route.get('/projects/personal', [validateTokenMiddleware], controllers.getProjectsPersonal)

// //Obtener los proyectos de tipo open-source
// route.get('/projects/open-source', [validateTokenMiddleware], controllers.getProjectsOpenSource)

// //Obtener todos los proyectos que creó un usuario en particular
// route.get('/user/:id/projects', [validateTokenMiddleware], controllers.getProjectsByUser);

//Obtener un proyecto en particular por ID
route.get('/projects/:id', [validateTokenMiddleware], controllers.getProjectById)

// Crear un nuevo proyecto
route.post('/projects', [verifyUserOwnership], controllers.createProject);

//Subir imagen del proyecto
route.post('/projects/:id/image', [upload.single('projectImage')], controllers.uploadProjectImage);

// //Agregar un nuevo proyecto personal
// route.post('/projects/personal', [validateTokenMiddleware, validatePersonalProjectCreate], controllers.createProject);

// //Agregar un nuevo proyecto open-source
// route.post('/projects/open-source', [validateTokenMiddleware, validateOpenSourceProjectCreate], controllers.createProject);

// //Editar un proyecto personal
// route.patch('/projects/personal/:id', [validateTokenMiddleware, validatePersonalProjectPatch], controllers.editProject);

// //Editar un proyecto open-source
// route.patch('/projects/open-source/:id', [validateTokenMiddleware, validateOpenSourceProjectPatch], controllers.editProject);

// //Borrar un proyecto (eliminado lógico)
// route.delete("/projects/:id", [validateTokenMiddleware], controllers.deleteProject);

export default route;