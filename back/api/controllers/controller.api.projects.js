import fs from 'fs';
import * as service from "../../services/projects.services.js";

// //Traer todos los proyectos
// const getProjects = (req, res) => {

//     const filter = req.query;

//     service.getProjects(filter)
//         .then((projects) => {
//             res.status(200).json(projects);
//         })
//         .catch((error) => {
//             res.status(404).json();
//         });

// };

//Obtener todos los proyectos abiertos
const getOpenProjects = async (req, res) => {

    try {
        const projects = await service.getOpenProjects();
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error al obtener proyectos abiertos:', error);
        res.status(500).json({ message: 'Ocurrió un problema al intentar obtener los proyectos, inténtalo de nuevo más tarde.' });
    }
};

// //Traer todos los proyectos de tipo personal
// const getProjectsPersonal = (req, res) => {

//     service.getProjectsPersonal({ deleted: true })
//         .then((projects) => {
//             res.status(200).json(projects);
//         })
//         .catch((error) => {
//             res.status(404).json();
//         });


// };

// //Traer todos los proyectos de tipo open-source
// const getProjectsOpenSource = (req, res) => {

//     service.getProjectsOpenSource({ deleted: true })
//         .then((projects) => {
//             res.status(200).json(projects);
//         })
//         .catch((error) => {
//             res.status(404).json();
//         });

// };

// //Traer todos los proyectos creados por un usuario en particular
// const getProjectsByUser = (req, res) => {

//     const id = req.params.id;

//     service.getProjectsByUser(id).then((projects) => {

//         if (projects) {
//             res.status(200).json(projects);
//         } else {
//             res.status(404).json();
//         }
//     });

// };

//Obtener un proyecto en particular por ID
const getProjectById = async (req, res) => {

    try {
        const { id } = req.params;
        const project = await service.getProjectById(id);

        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el proyecto.', error });
    }

};

//Obtener todos los proyectos de los que un usuario es parte
const getUserProjects = async (req, res) => {

    const { userId } = req.params;

    try {
        const projects = await service.getUserProjects(userId);

        return res.status(200).json({
            openProjects: projects.open,
            inProgressProjects: projects.inProgress,
            completedProjects: projects.completed
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los proyectos del usuario.', error: error.message });
    }
};

//Crear un nuevo proyecto
const createProject = async (req, res) => {

    const { userId, projectData, type } = req.body;

    try {
        const project = await service.createProject(userId, projectData, type);

        return res.status(201).json({ message: `Proyecto ${type} creado con éxito`, project });
    } catch (error) {
        return res.status(400).json({ message: `Error al crear el proyecto ${type}`, error: error.message });
    }
};

//Subir imagen del proyecto
const uploadProjectImage = async (req, res) => {

    const projectId = req.params.id;

    // Verificamos si se envió el archivo
    if (!req.file) {
        return res.status(400).json({ message: 'No se envió ninguna imagen.' });
    }

    const imagePath = `/uploads/projects/${req.file.filename}`;

    try {
        // Actualizamos la URL de la imagen del proyecto en la database
        await service.updateProjectImage(projectId, imagePath);

        res.status(200).json({
            message: 'Imagen del proyecto subida con éxito.',
            imageUrl: imagePath
        });
    } catch (error) {
        console.error('Error al subir la imagen del proyecto:', error);

        // En caso de error, eliminamos la imagen subida
        fs.unlinkSync(req.file.path);
        res.status(500).json({ message: 'Error al subir la imagen del proyecto.' });
    }
};

// Editar los detalles de un proyecto
const updateProjectDetails = async (req, res) => {

    const { id } = req.params;
    const projectDetails = req.body;

    //Falta actualizar la imagen (si hay)

    try {
        const updatedProject = await service.updateProjectDetails(id, projectDetails);

        return res.status(200).json({
            message: 'Proyecto actualizado con éxito.',
            project: updatedProject,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'Error al actualizar el proyecto.',
            error: error.message,
        });
    }
};

// //Editar un proyecto
// const editProject = async (req, res) => {

//     const id = req.params.id;

//     service.editProject(id, req.body)
//         .then((editedProject) => {
//             if (editedProject) {
//                 res.status(200).json(editedProject);
//             } else {
//                 res.status(404).json();
//             }
//         });

// };

// //Eliminar un proyecto
// const deleteProject = (req, res) => {

//     const id = req.params.id;

//     service
//         .deleteProject(id)
//         .then(() => {
//             res.status(204).json();
//         })
//         .catch((error) => res.status(500).json());

// };

export {
    getOpenProjects,
    // getProjectsPersonal,
    // getProjectsOpenSource,
    // getProjectsByUser,
    getProjectById,
    getUserProjects,
    createProject,
    uploadProjectImage,
    updateProjectDetails
    // editProject,
    // deleteProject
}
