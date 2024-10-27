import { useState } from 'react';
import { sendMessage } from '../../services/messagesService';
import { useToast } from '../../context/ToastContext';
import Input from "../Inputs/Input"
import Button from "../Button/Button"
import SendIcon from '../../assets/svg/send-message.svg?react';

const ChatInput = ({ chatId, onMessageSent, refreshChats }) => {

    const [message, setMessage] = useState('');

    const { addToast } = useToast();

    const handleSendMessage = async (e) => {

        e.preventDefault();

        if (message.trim() === "") return;

        try {
            await sendMessage({ chat_id: chatId, text: message });

            setMessage('');

            onMessageSent();

            refreshChats();
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