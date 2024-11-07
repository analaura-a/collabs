import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient("mongodb+srv://alumnos:alumnos@cluster0.rufodhz.mongodb.net");
const db = client.db("AH20232CP1");

// Verificar si un chat ya existe
const findExistingChat = async ({ type, participants, project_id }) => {

    const participantsIds = participants.map(id => new ObjectId(id));

    if (type === 'private') {

        // Verificar si un chat privado ya existe entre estos dos participantes
        return await db.collection('chats').findOne({
            type: 'private',
            participants: { $all: participantsIds, $size: participantsIds.length }
        });

    } else if (type === 'group' && project_id) {

        // Verificar si ya existe un chat grupal para este proyecto
        return await db.collection('chats').findOne({
            type: 'group',
            project_id: new ObjectId(project_id)
        });
    }

    return null;
};

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

// Obtener todos los chats de un usuario
const getUserChats = async (userId) => {

    const userObjectId = new ObjectId(userId);

    // 1. Obtener chats donde el usuario es participante
    const chats = await db.collection('chats')
        .find({ participants: userObjectId })
        .sort({ created_at: -1 })
        .toArray();

    // 2. Enriquecer cada chat con información adicional
    const enrichedChats = await Promise.all(chats.map(async (chat) => {

        const isGroup = chat.type === 'group';

        let lastMessageData, lastMessageSenderName = 'Usuario desconocido', hasUnreadMessages;

        // Obtener el último mensaje
        const lastMessage = await db.collection('messages').findOne(
            { chat_id: chat._id },
            { sort: { created_at: -1 } }
        );

        lastMessageData = lastMessage?.text || 'Sin mensajes';

        // Si hay un último mensaje, obtener los datos del remitente
        if (lastMessage?.sender_id) {

            if (lastMessage.sender_id == userId) {
                lastMessageSenderName = 'Tú';
            } else {
                const lastMessageSender = await db.collection('users').findOne({ _id: lastMessage.sender_id }, { projection: { name: 1, last_name: 1 } });

                lastMessageSenderName = lastMessageSender ? `${lastMessageSender.name}` : 'Usuario desconocido';
            }
        }

        // Verificar si hay mensajes no leídos
        hasUnreadMessages = await db.collection('messages')
            .countDocuments({
                chat_id: chat._id,
                read_by: { $ne: userObjectId }
            }) > 0;

        // Obtener información adicional dependiendo su tipo
        //Chats grupales:
        if (isGroup) {

            const project = await db.collection('projects').findOne({ _id: chat.project_id });

            const otherParticipants = chat.participants.filter(id => !id.equals(userObjectId));

            const participantDetails = await db.collection('users')
                .find({
                    _id: { $in: otherParticipants }
                })
                .project({ name: 1, last_name: 1 })
                .toArray();

            return {
                _id: chat._id,
                type: 'group',
                name: project.name,
                project_pic: project?.cover || null,
                participants_names: participantDetails.map(p => `${p.name} ${p.last_name}`),
                last_message: lastMessageData,
                last_to_speak: lastMessageSenderName,
                has_unread_messages: hasUnreadMessages
            };
        } else {
            //Chats privados:
            const otherUser = await db.collection('users')
                .findOne(
                    { _id: { $in: chat.participants.filter(id => !id.equals(userObjectId)) } },
                    { projection: { name: 1, last_name: 1, username: 1, profile_pic: 1 } }
                );

            return {
                _id: chat._id,
                type: 'private',
                name: `${otherUser?.name} ${otherUser?.last_name}` || 'Usuario desconocido',
                username: otherUser?.username,
                profile_pic: otherUser?.profile_pic || null,
                last_message: lastMessageData,
                has_unread_messages: hasUnreadMessages
            };
        }
    }));

    return enrichedChats;
};

// Obtener el chat grupal de un proyecto
const getProjectChat = async (projectId, userId) => {

    const projectObjectId = new ObjectId(projectId);
    const userObjectId = new ObjectId(userId);

    // Obtener el chat
    const chat = await db.collection('chats')
        .findOne({ project_id: projectObjectId });

    if (!chat) return null;

    // Obtener detalles del proyecto y el resto de participantes
    const project = await db.collection('projects')
        .findOne({ _id: projectObjectId });

    const otherParticipants = chat.participants.filter(id => !id.equals(userObjectId));
    const participantDetails = await db.collection('users')
        .find({ _id: { $in: otherParticipants } })
        .project({ name: 1, last_name: 1 })
        .toArray();

    return {
        _id: chat._id,
        type: 'group',
        name: project.name,
        project_pic: project?.cover || null,
        participants_names: participantDetails.map(p => `${p.name} ${p.last_name}`),
    };
};

export {
    findExistingChat,
    createChat,
    getUserChats,
    getProjectChat
}