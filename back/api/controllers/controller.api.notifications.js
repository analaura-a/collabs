import * as service from "../../services/notifications.services.js"

// Obtener todas las notificaciones de un usuario
const getUserNotifications = async (req, res) => {

    const { userId } = req.params;

    try {
        const notifications = await service.getUserNotifications(userId);
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una notificación
const createNotification = async (req, res) => {
    try {
        const newNotification = await service.createNotification(req.body);
        res.status(201).json({ message: "¡Notificación creada con éxito!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Marcar todas las notificaciones de un usuario como leídas
const markAllNotificationsAsRead = async (req, res) => {

    const { userId } = req.params;

    try {
        await service.markAllNotificationsAsRead(userId);
        res.status(200).json({ message: 'Todas las notificaciones han sido marcadas como leídas' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Marcar una notificación como leída
const markNotificationAsRead = async (req, res) => {

    const { notificationId } = req.params;

    try {
        await service.markNotificationAsRead(notificationId);
        res.status(200).json({ message: 'Notificación marcada como leída' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getUserNotifications,
    createNotification,
    markAllNotificationsAsRead,
    markNotificationAsRead
}