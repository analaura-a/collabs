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

export {
    getProjectShortcuts
}