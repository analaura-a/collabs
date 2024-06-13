import * as service from "../../services/projects.services.js";

//Traer todos los proyectos
const getProjects = (req, res) => {

    const filter = req.query;

    service.getProjects(filter)
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((error) => {
            res.status(404).json();
        });

};

//Traer todos los proyectos de tipo personal
const getProjectsPersonal = (req, res) => {

    service.getProjectsPersonal({ deleted: true })
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((error) => {
            res.status(404).json();
        });


};

//Traer todos los proyectos de tipo open-source
const getProjectsOpenSource = (req, res) => {

    service.getProjectsOpenSource({ deleted: true })
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((error) => {
            res.status(404).json();
        });

};

//Traer todos los proyectos creados por un usuario en particular
const getProjectsByUser = (req, res) => {

    const id = req.params.id;

    service.getProjectsByUser(id).then((projects) => {

        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(404).json();
        }
    });

};

//Traer un proyecto en particular
const getProjectById = (req, res) => {
    const id = req.params.id;
    service.getProjectById(id).then((project) => {
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json();
        }
    });
};

//Crear un nuevo proyecto
const createProject = (req, res) => {

    service
        .createProject(req.body)
        .then((newProject) => {
            res.status(201).json(newProject);
        })
        .catch((error) => {
            res.status(500).json();
        });
};


//Editar un proyecto
const editProject = async (req, res) => {

    const id = req.params.id;

    service.editProject(id, req.body)
        .then((editedProject) => {
            if (editedProject) {
                res.status(200).json(editedProject);
            } else {
                res.status(404).json();
            }
        });

};

//Eliminar un proyecto
const deleteProject = (req, res) => {

    const id = req.params.id;

    service
        .deleteProject(id)
        .then(() => {
            res.status(204).json();
        })
        .catch((error) => res.status(500).json());

};

export {
    getProjects,
    getProjectsPersonal,
    getProjectsOpenSource,
    getProjectsByUser,
    getProjectById,
    createProject,
    editProject,
    deleteProject
}
