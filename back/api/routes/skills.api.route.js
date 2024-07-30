import { Router } from 'express';
import * as controllers from '../controllers/controller.api.skills.js'

const route = Router();

/* API SKILLS */
//Obtener todas las skills
route.get('/skills', controllers.getSkills);

export default route;