import { useState } from 'react';
import Input from "../Inputs/Input"
import Button from "../Button/Button"
import SendIcon from '../../assets/svg/send-message.svg?react';

const ChatInput = () => {

    const [message, setMessage] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log("Mensaje enviado:", message);
        setMessage('');
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

            <Button type="submit" icon={<SendIcon />}></Button>
        </form>
    );
};

export default ChatInput;