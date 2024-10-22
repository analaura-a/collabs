const ChatItem = ({ chat, onClick, isSelected }) => {

    return (
        <div className={`chat-item ${isSelected ? 'chat-item-selected' : ''}`} onClick={onClick}>

            {/* Obtener foto de perfil del usuario/foto del proyecto */}
            <div className="chat-item__img">
                <img src="../assets/jpg/no-profile-picture.jpg" alt={chat.name} />
            </div>

            {/* Obtener nombre del usuario/nombre del proyecto */}
            <div className="chat-item__info">
                <p className="subtitle medium-text black-color-text">{chat.name}</p>
                <p className="light-paragraph chat-item__last-message">{chat.lastMessage}</p> {/* Mostrar nombre del usuario que escribió el último mensaje en chats grupales (si llegamos) */}
            </div>
        </div>
    );
};

export default ChatItem;