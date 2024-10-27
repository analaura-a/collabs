import * as service from "../../services/messages.services.js"

// Enviar un mensaje en un chat
const sendMessage = async (req, res) => {

    const { chat_id, sender_id, text } = req.body;

    try {
        const newMessage = await service.sendMessage({ chat_id, sender_id, text });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
    }
};

// Obtener mensajes de un chat
const getChatMessages = async (req, res) => {

    const chatId = req.params.chatId;

    try {
        const messages = await service.getChatMessages(chatId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los mensajes del chat', error: error.message });
    }
};

export {
    sendMessage,
    getChatMessages
}