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

// //Crear un nuevo proyecto
// const createProject = (req, res) => {

//     service
//         .createProject(req.body)
//         .then((newProject) => {
//             res.status(201).json(newProject);
//         })
//         .catch((error) => {
//             res.status(500).json();
//         });
// };


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
    // createProject,
    // editProject,
    // deleteProject
}
