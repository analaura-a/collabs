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

    return (
        <div className={onBack ? "messages-page-with-back-button" : "messages-page-without-back-button"}>

            {onBack && <button className="small-button-with-icon arrow-left" onClick={onBack}></button>}

            {!hasChats ? (
                renderEmptyState()
            ) : (
                <div className="chat-container">

                    <div className="chat__header">
                        <div className="chat-item__img"> {/* Obtener datos reales */}
                            <img src="../assets/jpg/no-profile-picture.jpg" alt="Foto de perfil" />
                        </div>

                        <div className="chat__header__info"> {/* Obtener datos reales */}
                            <h2 className="title-20 medium-text">{chat.name}</h2>
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
            )}
        </div>
    );
};

export default ChatView;