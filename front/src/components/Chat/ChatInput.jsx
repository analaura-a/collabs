import { useState } from 'react';
import { sendMessage } from '../../services/messagesService';
import { useToast } from '../../context/ToastContext';
import Input from "../Inputs/Input"
import Button from "../Button/Button"
import SendIcon from '../../assets/svg/send-message.svg?react';
import socket from '../../services/socket';

const ChatInput = ({ chatId, onMessageSent, refreshChats }) => {

    const [message, setMessage] = useState('');

    const { addToast } = useToast();

    const handleSendMessage = async (e) => {

        e.preventDefault();

        if (message.trim() === "") return;

        try {
            // Enviar el mensaje al backend para guardarlo en la base de datos
            const savedMessage = await sendMessage({ chat_id: chatId, text: message });

            // Emitir el mensaje guardado a los otros usuarios en el chat en tiempo real
            socket.emit('send_message', {
                ...savedMessage, 
                chatId: chatId
            });

            setMessage('');

            onMessageSent();

            if (refreshChats) {
                refreshChats();
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al enviar el mensaje',
                message: 'Ocurrió un error desconocido al intentar enviar el mensaje. Inténtalo de nuevo más tarde.'
            });
        }
    };

    return (
        <form className="chat__input" onSubmit={handleSendMessage}>
            <Input
                type="text"
                placeholder="¿Qué te gustaría decir?"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />

            <Button type="submit" icon={<SendIcon />} disabled={message.trim() === ""}></Button>
        </form>
    );
};

export default ChatInput;