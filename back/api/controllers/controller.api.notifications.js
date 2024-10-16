import * as service from "../../services/notifications.services.js"

// Crear una notificación
const createNotification = async (req, res) => {
    try {
        const newNotification = await service.createNotification(req.body);
        res.status(201).json({ message: "¡Notificación creada con éxito!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createNotification
}