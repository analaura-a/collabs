import * as service from "../../services/chats.services.js"

// Crear un nuevo chat
const createChat = async (req, res) => {

    const { type, participants, project_id } = req.body;

    try {
        const newChat = await service.createChat({ type, participants, project_id });
        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el chat', error: error.message });
    }
};

// Obtener todos los chats de un usuario
const getUserChats = async (req, res) => {

    const userId = req.account._id;

    try {
        const userChats = await service.getUserChats(userId);
        res.status(200).json(userChats);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los chats', error: error.message });
    }
};

export {
    createChat,
    getUserChats
}