import * as service from "../../services/projects_shortcuts.services.js";

// Obtener los atajos de un proyecto
const getProjectShortcuts = async (req, res) => {

    const { projectId } = req.params;

    try {
        const shortcuts = await service.getProjectShortcuts(projectId);
        res.status(200).json(shortcuts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo atajo
const createProjectShortcut = async (req, res) => {

    const { projectId, userId, name, url } = req.body;

    if (!name || !url) {
        return res.status(400).json({ message: 'Nombre y URL son obligatorios.' });
    }

    try {
        await service.createProjectShortcut(projectId, { name, url, created_by: userId });
        res.status(201).json({ message: 'Atajo creado con éxito.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Editar un atajo
const updateProjectShortcut = async (req, res) => {

    const { shortcutId } = req.params;
    const { projectId, userId, name, url } = req.body;

    try {
        const updatedShortcut = await service.updateProjectShortcut(shortcutId, { name, url });
        res.status(200).json({ message: 'Atajo rápido actualizado con éxito.', shortcut: updatedShortcut });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getProjectShortcuts,
    createProjectShortcut,
    updateProjectShortcut
}