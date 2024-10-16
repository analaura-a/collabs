import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const notifications = db.collection("notifications");

// Crear una notificación
const createNotification = async (notificationData) => {

    try {
        notificationData.created_at = new Date();
        notificationData.is_read = false;
        const result = await notifications.insertOne(notificationData);
        return result;
    } catch (error) {
        throw new Error('Error al crear la notificación: ' + error.message);
    }
};

export {
    createNotification
}