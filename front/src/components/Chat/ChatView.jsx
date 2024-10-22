import ChatInput from "./ChatInput";

const ChatView = ({ chat, onBack }) => {

    return (
        <>
            {/* {onBack && <button className="back-button" onClick={onBack}>Atrás</button>}  Botón "Atrás" en mobile */}

            <div className="chat-container">

                <div className="chat__header">
                    <div className="chat-item__img"> {/* Obtener datos reales */}
                        <img src="../assets/jpg/no-profile-picture.jpg" alt="Foto de perfil" />
                    </div>

                    <div className="chat__header__info"> {/* Obtener datos reales */}
                        <h2 className="title-20 medium-text">María Fernández</h2>
                        <p className="light-paragraph">@maríafernandez</p>
                    </div>
                </div>

                <div className="chat__messages">
                    {/* {chat.messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            userId={userId} // ID del usuario actual
                            isGroupChat={chat.type === 'group'} // True si es un chat grupal
                        />
                    ))} */}
                    Mensajes aquí
                </div>

                <ChatInput />

            </div>
        </>
    );
};

export default ChatView;