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

export {
    sendMessage
}