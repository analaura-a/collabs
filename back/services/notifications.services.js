import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const notifications = db.collection("notifications");

// Obtener todas las notificaciones de un usuario
const getUserNotifications = async (userId) => {

    try {
        // 1. Obtener las notificaciones del usuario
        const userNotifications = await notifications
            .find({ user_id: new ObjectId(userId) })
            .sort({ created_at: -1 })
            .toArray();

        // 2. Obtener información extra de los usuarios que dispararon las notificaciones
        const senderIds = userNotifications.map(notification => notification.sender_id);

        const sendersDetails = await db.collection('users')
            .find({ _id: { $in: senderIds } })
            .toArray();

        // 3. Combinar y devolver datos
        const enrichedNotifications = userNotifications.map(notification => {
            const senderDetail = sendersDetails.find(user => user._id.equals(notification.sender_id));
            return {
                ...notification,
                sender_profile_pic: senderDetail?.profile_pic,
            };
        });

        return enrichedNotifications;
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

// Marcar una notificación como leída
const markNotificationAsRead = async (notificationId) => {

    try {
        await notifications.updateOne(
            { _id: new ObjectId(notificationId) },
            { $set: { is_read: true } }
        );
    } catch (error) {
        throw new Error('Error al marcar la notificación como leída: ' + error.message);
    }
};

export {
    getUserNotifications,
    createNotification,
    markAllNotificationsAsRead,
    markNotificationAsRead
}