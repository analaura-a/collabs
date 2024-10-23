import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const MessageBubble = ({ message, isGroupChat }) => {

    const { authState } = useContext(AuthContext);
    const { user } = authState;

    // Verificar si el mensaje fue enviado por el usuario actual
    const isMyMessage = user && message.sender_id === user._id;

    return (
        <div className={`message-bubble-container ${isMyMessage ? 'my-message' : 'other-message'}`}>

            {/* Mostrar la foto de perfil solo si es un chat grupal y no soy yo */}
            {!isMyMessage && isGroupChat && (
                <>
                    {
                        message.profile_pic ? (
                            <div className="message-bubble__profile-pic">
                                <img src={`${SERVER_BASE_URL}${message.profile_pic}`} alt={message.sender_name} />
                            </div>
                        ) : (
                            <div className="message-bubble__profile-pic">
                                <img src="../assets/jpg/no-profile-picture.jpg" alt={message.sender_name} />
                            </div>
                        )
                    }
                </>
            )}

            <div className="message-bubble__content">
                <div className="message-bubble">
                    {/* Mostrar el nombre del remitente en chats grupales */}
                    {isGroupChat && !isMyMessage && (
                        <p className="smaller-paragraph medium-text primary-color-text">{message.sender_name}</p>
                    )}

                    <p className="paragraph">{message.text}</p>
                </div>

                <p className="tiny-paragraph black-light-color-text">{message.created_at}</p>
            </div>
        </div>
    );
};

export default MessageBubble;