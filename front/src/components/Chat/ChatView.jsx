import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const ChatView = ({ activeTab, chat, onBack, hasChats }) => {

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
        return null;
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

                        <div className="chat__header__info"> {/* Obtener datos reales */}
                            <h2 className="title-20 medium-text">{chat.name}</h2>

                            {chat.type === "private" ? (
                                <p className="light-paragraph">@{chat.username}</p>
                            ) : (
                                <p className="light-paragraph">{renderParticipants(chat.participants_names)}</p>
                            )}
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

                        <MessageBubble />
                    </div>

                    <ChatInput />

                </div>
            )}
        </div>
    );
};

export default ChatView;