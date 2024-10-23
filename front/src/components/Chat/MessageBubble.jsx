const MessageBubble = ({ message, isGroupChat }) => {

    // const isMyMessage = message.sender_id === userId; // Verificar si el mensaje es mío

    return (
        <>
            {/* <div className={`message-bubble ${isMyMessage ? 'my-message' : 'other-message'}`}>
                {/* Mostrar la foto de perfil solo si es un chat grupal y no soy yo 
                {!isMyMessage && isGroupChat && (
                    <img
                        src={message.senderProfilePic}
                        alt={message.senderName}
                        className="message-sender-pic"
                    />
                )}

                <div className="message-content">
                    {/* Mostrar el nombre del remitente en chats grupales (si no soy yo) 
                    {isGroupChat && !isMyMessage && (
                        <p className="message-sender-name">{message.senderName}</p>
                    )}

                    <p className="message-text">{message.text}</p>
                    <p className="message-timestamp">{message.timestamp}</p>
                </div>
            </div> */}

            {/* Ejemplo de mensaje enviado por otra persona */}
            <div className={`message-bubble-container other-message`}>
                <div className="message-bubble__profile-pic">
                    <img src="../assets/jpg/no-profile-picture.jpg" alt="Foto de perfil" />
                </div>

                <div className="message-bubble__content">
                    <div className="message-bubble">
                        <p className="smaller-paragraph medium-text primary-color-text">María Fernandez</p>
                        <p className="paragraph">Hola, creo que ya estamos todos!</p>
                    </div>

                    <p className="tiny-paragraph black-light-color-text">Sep 03, 2023, 10:44 AM</p>
                </div>
            </div>

            {/* Ejemplo de mensaje enviado por mí */}
            <div className={`message-bubble-container my-message`}>
                <div className="message-bubble__content">
                    <div className="message-bubble">
                        <p className="paragraph">Buenísimo! Cuándo empezamos? 👀</p>
                    </div>

                    <p className="tiny-paragraph black-light-color-text">Sep 03, 2023, 10:46 AM</p>
                </div>
            </div>
        </>
    );
};

export default MessageBubble;