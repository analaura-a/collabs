import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const notifications = db.collection("notifications");

// Obtener todas las notificaciones de un usuario
const getUserNotifications = async (userId) => {

    try {
        const userNotifications = await notifications
            .find({ user_id: new ObjectId(userId) })
            .sort({ created_at: -1 })
            .toArray();
        return userNotifications;
    } catch (error) {
        throw new Error('Error al obtener las notificaciones del usuario: ' + error.message);
    }
};

// Crear una notificación
const createNotification = async (notificationData) => {

    try {
        notificationData.user_id = new ObjectId(notificationData.user_id);
        notificationData.sender_id = new ObjectId(notificationData.sender_id);
        notificationData.created_at = new Date();
        notificationData.is_read = false;
        const result = await notifications.insertOne(notificationData);
        return result;
    } catch (error) {
        throw new Error('Error al crear la notificación: ' + error.message);
    }
};

// Marcar todas las notificaciones de un usuario como leídas
const markAllNotificationsAsRead = async (userId) => {
    
    try {
        await notifications.updateMany(
            { user_id: new ObjectId(userId), is_read: false },
            { $set: { is_read: true } }
        );
    } catch (error) {
        throw new Error('Error al marcar todas las notificaciones como leídas: ' + error.message);
    }
};

export {
    getUserNotifications,
    createNotification,
    markAllNotificationsAsRead
}