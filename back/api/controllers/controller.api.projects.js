import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ObjectId } from "mongodb";
import * as service from "../../services/projects.services.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

//Obtener la cantidad de proyectos personales y open-source en los que el usuario colaboró
const getUserProjectsCount = async (req, res) => {

    const userId = req.params.userId;

    try {
        const projectCollaborations = await service.getUserProjectsCount(userId);
        res.status(200).json(projectCollaborations);
    } catch (error) {
        console.error('Error al obtener el número de proyectos del usuario:', error.message);
        res.status(500).json({ message: 'Ocurrió un error al obtener el número de proyectos del usuario.' });
    }
};

//Obtener los últimos 2 proyectos de un usuario
const getLastTwoProjectsJoinedByUser = async (req, res) => {

    const userId = req.params.userId;

    try {
        const lastTwoProjects = await service.getLastTwoProjectsJoinedByUser(userId);
        res.status(200).json(lastTwoProjects);
    } catch (error) {
        console.error('Error al obtener los últimos proyectos del usuario:', error.message);
        res.status(500).json({ message: 'Ocurrió un error al obtener los últimos proyectos del usuario.' });
    }
};

// Obtener los proyectos recomendados para un usuario
const getRecommendedProjectsForUser = async (req, res) => {

    const userId = req.params.userId;

    try {
        const recommendedProjects = await service.getRecommendedProjectsForUser(userId);
        res.status(200).json(recommendedProjects);
    } catch (error) {
        console.error('Error al obtener los proyectos recomendados:', error.message);
        res.status(500).json({ message: 'Ocurrió un error al obtener los proyectos recomendados.' });
    }
};

// Obtener los últimos 3 proyectos creados
const getRecentProjects = async (req, res) => {
    try {
        const recentProjects = await service.getRecentProjects();
        res.status(200).json(recentProjects);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proyectos recientes", error: error.message });
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
        // Obtener el proyecto actual para verificar si ya tiene una imagen
        const currentProject = await service.getProjectById(projectId);

        if (!currentProject) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        // Si el proyecto ya tiene una imagen, la eliminamos
        if (currentProject.cover) {

            // Construye la ruta completa a la carpeta "uploads"
            const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads', 'projects');
            const existingImagePath = path.join(uploadsDir, path.basename(currentProject.cover));

            // Verifica si el archivo existe antes de eliminarlo
            if (fs.existsSync(existingImagePath)) {
                try {
                    fs.unlinkSync(existingImagePath);
                } catch (unlinkError) {
                    console.error('Error al eliminar la imagen antigua:', unlinkError);
                }
            }
        }

        // Actualizamos la URL de la imagen del proyecto en la database
        await service.updateProjectImage(projectId, imagePath);

        res.status(200).json({
            message: 'Imagen del proyecto subida con éxito.',
            imageUrl: imagePath
        });
    } catch (error) {
        console.error('Error al subir la imagen del proyecto:', error);

        // En caso de error, eliminamos la imagen recién subida
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: 'Error al subir la imagen del proyecto.' });
    }
};

// Editar los detalles de un proyecto
const updateProjectDetails = async (req, res) => {

    const { id } = req.params;
    const projectDetails = req.body;

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

// Editar la convocatoria de un proyecto
const updateProjectOpenPositions = async (req, res) => {

    const { id } = req.params;
    const { open_positions } = req.body;

    try {
        // Obtener el proyecto actual para comparar las open_positions
        const project = await service.getProjectById(id);
        if (!project) {
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }
        const existingPositions = project.open_positions;

        // Actualizar, agregar o eliminar las posiciones según corresponda:
        const updatedPositions = [];

        open_positions.forEach((position) => {
            if (position._id) {
                // Si tiene un _id, es una posición existente -> la actualizamos
                const existingPosition = existingPositions.find(p => p._id.toString() === position._id);
                if (existingPosition) {
                    updatedPositions.push({ ...existingPosition, ...position });
                }
            } else {
                // Si no tiene _id, es una nueva posición -> le asignamos un nuevo _id
                updatedPositions.push({
                    ...position,
                    _id: new ObjectId(),
                });
            }
        });

        // Eliminar posiciones que ya no están en la lista
        const positionsToDelete = existingPositions.filter(
            (position) => !open_positions.some(p => p._id && p._id === position._id.toString())
        );

        if (positionsToDelete.length > 0) {
            await service.removeOpenPositionsByIds(id, positionsToDelete.map(p => p._id));
        }

        // Actualizamos las open_positions del proyecto
        const updatedProject = await service.updateProjectOpenPositions(id, updatedPositions);

        return res.status(200).json({
            message: 'Convocatoria actualizada con éxito.',
            project: updatedProject,
        });

    } catch (error) {
        return res.status(400).json({
            message: 'Error al actualizar la convocatoria.',
            error: error.message,
        });
    }
};

// Cambiar el estado de un proyecto
const updateProjectStatus = async (req, res) => {

    const { projectId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Abierto', 'En curso', 'Finalizado'];

    // Verificar si el estado proporcionado es válido
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'El estado enviado no es válido.',
        });
    }

    try {
        const updatedProject = await service.updateProjectStatus(projectId, status);

        if (!updatedProject) {
            return res.status(404).json({
                message: 'Proyecto no encontrado.',
            });
        }

        return res.status(200).json({
            message: `Estado del proyecto cambiado a ${status}.`,
            project: updatedProject,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error al actualizar el estado del proyecto: ${error.message}`,
        });
    }
};

// Eliminar un proyecto
const deleteProject = async (req, res) => {

    const { projectId } = req.params;

    try {
        await service.deleteProject(projectId);
        res.status(200).json({ message: '¡Proyecto eliminado con éxito!' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el proyecto:', error: error.message });
    }
};

export {
    getOpenProjects,
    getProjectById,
    getUserProjects,
    getUserProjectsCount,
    getLastTwoProjectsJoinedByUser,
    getRecommendedProjectsForUser,
    getRecentProjects,
    createProject,
    uploadProjectImage,
    updateProjectDetails,
    updateProjectOpenPositions,
    updateProjectStatus,
    deleteProject
}
