const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const ChatItem = ({ chat, onClick, isSelected }) => {

    return (
        <div className={`chat-item ${isSelected ? 'chat-item-selected' : ''} ${chat.has_unread_messages ? 'chat-item-unread' : ''}`} onClick={onClick}>

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
                                <img src="../assets/jpg/no-profile-picture.jpg" alt={chat.name} />
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

            <div className="chat-item__info">
                <p className="subtitle medium-text black-color-text">{chat.name}</p>

                {chat.type === "private" ? (
                    <p className="light-paragraph chat-item__last-message">{chat.last_message}</p>
                ) : (
                    // <p className="light-paragraph chat-item__last-message">{chat.last_to_speak}: {chat.last_message}</p>
                    //Verificar si hay mensajes en el chat antes de poner el siguiente nombre
                    <>
                        {chat.last_to_speak != "Usuario desconocido" ? (
                            <p className="light-paragraph chat-item__last-message">{chat.last_to_speak}: {chat.last_message}</p>
                        ) : (
                            <p className="light-paragraph chat-item__last-message">{chat.last_message}</p>
                        )}
                    </>
                )}

            </div>
        </div>
    );
};

export default ChatItem;