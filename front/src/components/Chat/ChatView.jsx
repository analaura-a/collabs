import { useState, useEffect } from 'react';
import { getChatMessages, markMessagesAsRead } from '../../services/messagesService';
import { useToast } from '../../context/ToastContext';
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import Loader from '../Loader/Loader';
import socket from '../../services/socket';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ChatView = ({ activeTab, chat, onBack, hasChats, refreshChats }) => {

    const [messages, setMessages] = useState([]);

    const { addToast } = useToast();

    const fetchMessages = async () => {
        try {
            //Obtener mensajes del chat
            const messagesData = await getChatMessages(chat._id);
            setMessages(messagesData);

            // Marcar los mensajes como leídos después de cargarlos
            await markMessagesAsRead(chat._id);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar los mensajes',
                message: 'Ocurrió un error desconocido al intentar cargar los mensajes. Inténtalo de nuevo más tarde.'
            });
        }
    };
    // Unirse al chat en tiempo real al abrirlo
    useEffect(() => {
        if (chat) {
            fetchMessages();
            socket.emit('join_chat', chat._id); // Unirse a la sala del chat

            // Escuchar nuevos mensajes
            socket.on('newMessage', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);

            });
            // Limpiar efecto al desmontar el componente
            return () => {
                socket.off('newMessage'); // Desuscribirse al evento al desmontar
                socket.emit('leaveChat', chat._id); // Salir del chat
            };
        }


    }, [chat]);

    //Empty states
    const renderEmptyState = () => {
        if (activeTab === 'Privados' && !hasChats) {
            return (
                <div className="chat-container chat-empty-state faded-pattern-container">

                    <div className="faded-pattern faded-pattern-top-left"></div>
                    <div className="faded-pattern faded-pattern-bottom-right"></div>

                    <div className="applications-page__empty-state">
                        <img src="../../assets/svg/messages-empty-state.svg" alt="Sin mensajes" />

                        <div>
                            <h2 className="title-32-medium">No tienes chats privados</h2>
                            <p className="subtitle-18">Envía mensajes a otras personas a través de su perfil.</p>
                        </div>
                    </div>

                </div>
            );
        }
        if (activeTab === 'Grupales' && !hasChats) {
            return (
                <div className="chat-container chat-empty-state faded-pattern-container">

                    <div className="faded-pattern faded-pattern-top-left"></div>
                    <div className="faded-pattern faded-pattern-bottom-right"></div>

                    <div className="applications-page__empty-state">
                        <img src="../../assets/svg/messages-empty-state.svg" alt="Sin mensajes" />

                        <div>
                            <h2 className="title-32-medium">No tienes chats grupales</h2>
                            <p className="subtitle-18">Una vez que te unas a colaborar en un proyecto, podrás hablar con tus compañeros de equipo por chat.</p>
                        </div>
                    </div>

                </div>
            );
        }
        return <Loader />;
    };

    //Verificación para que no renderice el chat hasta que haya un chat seleccionado
    if (!chat) {
        return (
            <div className={onBack ? "messages-page-with-back-button" : "messages-page-without-back-button"}>
                {renderEmptyState()}
            </div>
        )
    }

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

    return (
        <div className={onBack ? "messages-page-with-back-button" : "messages-page-without-back-button"}>

            {onBack && <button className="small-button-with-icon arrow-left" onClick={onBack}></button>}

            {!hasChats ? (
                renderEmptyState()
            ) : (
                <div className="chat-container">

                    <div className="chat__header">

                        {chat.type === "private" ? (
                            // Si el chat es privado, mostramos la foto de perfil del usuario 
                            <>
                                {
                                    chat.profile_pic ? (
                                        <div className="chat-item__img">
                                            <img src={`${SERVER_BASE_URL}${chat.profile_pic}`} alt={chat.name} />
                                        </div>
                                    ) : (
                                        <div className="chat-item__img">
                                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Foto de perfil" />
                                        </div>
                                    )
                                }
                            </>
                        ) : (
                            // Si el chat es grupal, mostramos la foto del proyecto
                            <>
                                {
                                    chat.project_pic ? (
                                        <div className="chat-item__img">
                                            <img src={`${SERVER_BASE_URL}${chat.project_pic}`} alt={chat.name} />
                                        </div>
                                    ) : (
                                        <div className="chat-item__img">
                                            <img src="../assets/jpg/no-project-picture.jpg" alt={chat.name} />
                                        </div>
                                    )
                                }
                            </>
                        )}

                        <div className="chat__header__info">
                            <h2 className="title-20 medium-text">{chat.name}</h2>

                            {chat.type === "private" ? (
                                <p className="light-paragraph">@{chat.username}</p>
                            ) : (
                                <p className="light-paragraph">{renderParticipants(chat.participants_names)}</p>
                            )}
                        </div>
                    </div>

                    <div className="chat__messages">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isGroupChat={chat.type === 'group'}
                            />
                        ))}
                    </div>

                    <ChatInput
                        chatId={chat._id}
                        onMessageSent={fetchMessages}
                        refreshChats={refreshChats}
                    />

                </div>
            )}
        </div>
    );
};

export default ChatView;