import { useState, useEffect } from 'react';
import { getChatMessages, markMessagesAsRead } from '../../services/messagesService';
import { getProjectChat } from '../../services/chatService';
import { useToast } from '../../context/ToastContext';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import Loader from '../Loader/Loader';
import socket from '../../services/socket';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ProjectChatView = ({ projectId }) => {

    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);

    const { addToast } = useToast();

    // Obtener el chat grupal
    const fetchProjectChat = async () => {
        try {
            const projectChat = await getProjectChat(projectId);

            if (projectChat) {
                setChat(projectChat);

                // Obtener los mensajes del chat
                fetchMessages(projectChat._id);

                socket.emit('join_chat', projectChat._id);
            } else {
                addToast({
                    type: 'error',
                    title: 'Error al cargar el chat grupal',
                    message: 'Ocurrió un error al intentar cargar el chat grupal. Inténtalo de nuevo más tarde.'
                });
            }
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar el chat grupal',
                message: 'Ocurrió un error al intentar cargar el chat grupal. Inténtalo de nuevo más tarde.'
            });
        }
    };

    const fetchMessages = async (chatId) => {
        try {
            // Obtener los mensajes del chat
            const messagesData = await getChatMessages(chatId);
            setMessages(messagesData);

            // Marcarlos como leídos
            await markMessagesAsRead(chatId);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar mensajes',
                message: 'No se pudieron cargar los mensajes del chat. Inténtalo de nuevo más tarde.'
            });
        }
    };

    // Suscribirse a sockets y unirse al chat en tiempo real
    useEffect(() => {
        if (chat) {
            // Escuchar nuevos mensajes
            socket.on('newMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });

            // Cleanup al desmontar
            return () => {
                socket.off('newMessage');
                socket.emit('leaveChat', chat._id);
            };
        }
    }, [chat]);

    // Cargar el chat del proyecto al montar el componente
    useEffect(() => {
        fetchProjectChat();
    }, [projectId]);

    //Renderizar los nombres de los participantes del chat grupal
    const renderParticipants = (participants) => {
        if (participants.length === 0) {
            // Caso 1: Si no hay participantes
            return "Solo tú";
        } else if (participants.length === 1) {
            // Caso 2: Si hay solo 1 participante más
            return `${participants[0]} y tú`;
        } else {
            // Caso 3: Si hay más de 1 participante
            const allButLast = participants.slice(0, -1).join(', ');
            const lastParticipant = participants[participants.length - 1];
            return `${allButLast}, ${lastParticipant} y tú`;
        }
    };

    if (!chat) {
        return <Loader />;
    }

    return (
        <div className="chat-container project-chat-container">
            <div className="chat__header">
                {chat.project_pic ? (
                    <div className="chat-item__img">
                        <img src={`${SERVER_BASE_URL}${chat.project_pic}`} alt={chat.name} />
                    </div>
                ) : (
                    <div className="chat-item__img">
                        <img src="../assets/jpg/no-project-picture.jpg" alt="Imagen del proyecto" />
                    </div>
                )}

                <div className="chat__header__info">
                    <h2 className="title-20 medium-text">{chat.name}</h2>
                    <p className="light-paragraph">{renderParticipants(chat.participants_names)}</p>
                </div>
            </div>

            <div className="chat__messages">
                {messages.map((message) => (
                    <MessageBubble
                        key={message._id}
                        message={message}
                        isGroupChat={true}
                    />
                ))}
            </div>

            <ChatInput
                chatId={chat._id}
                onMessageSent={() => fetchMessages(chat._id)}
            />
        </div>
    );
};

export default ProjectChatView;