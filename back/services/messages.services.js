import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// Enviar un mensaje en un chat
const sendMessage = async ({ chat_id, sender_id, text }) => {

    const newMessage = {
        chat_id: new ObjectId(chat_id),
        sender_id: new ObjectId(sender_id),
        text,
        created_at: new Date(),
        read_by: [new ObjectId(sender_id)]
    };

    const result = await db.collection('messages').insertOne(newMessage);
    return result;
};

// Obtener mensajes de un chat
const getChatMessages = async (chatId) => {

    const chatObjectId = new ObjectId(chatId);

    // Obtener mensajes
    const messages = await db.collection('messages')
        .find({ chat_id: chatObjectId })
        .sort({ created_at: 1 })
        .toArray();

    // Enriquecer cada mensaje con datos del remitente
    const enrichedMessages = await Promise.all(messages.map(async (message) => {

        const sender = await db.collection('users').findOne(
            { _id: new ObjectId(message.sender_id) },
            { projection: { name: 1, last_name: 1, profile_pic: 1 } }
        );

        return {
            ...message,
            sender_name: `${sender?.name} ${sender?.last_name}` || 'Usuario desconocido',
            profile_pic: sender?.profile_pic || null
        };
    }));

    return enrichedMessages;
};

// Marcar mensajes como leídos
const markMessagesAsRead = async ({ chatId, userId }) => {

    const chatObjectId = new ObjectId(chatId);
    const userObjectId = new ObjectId(userId);

    // Actualizar los mensajes en el chat que no han sido leídos por el usuario
    await db.collection('messages').updateMany(
        {
            chat_id: chatObjectId,
            read_by: { $ne: userObjectId }
        },
        { $push: { read_by: userObjectId } }
    );
};

export {
    sendMessage,
    getChatMessages,
    markMessagesAsRead
}