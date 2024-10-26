import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");
const chats = db.collection("chats");

// Crear un nuevo chat
const createChat = async ({ type, participants, project_id }) => {

    const newChat = {
        type,
        participants: participants.map(id => new ObjectId(id)),
        project_id: type === 'group' ? new ObjectId(project_id) : null,
        created_at: new Date(),
    };

    const result = await db.collection('chats').insertOne(newChat);
    return result;
};

export {
    createChat
}