import { useState, useEffect } from 'react';
import ChatList from '../../components/Chat/ChatList';
import ChatView from '../../components/Chat/ChatView';

const MessagesPage = () => {

    const [activeTab, setActiveTab] = useState('Privados');

    const [chats, setChats] = useState([]); // Lista de chats para la tab actual
    const [selectedChat, setSelectedChat] = useState(null);

    const [isMobileView, setIsMobileView] = useState(false);

    // Detectar si la vista es mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 800);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Carga de chats según la tab seleccionada
    useEffect(() => {

        const fetchChats = async () => {
            if (activeTab === 'Privados') {
                // Ejemplo:
                setChats([
                    {
                        _id: "chat_id_1",
                        type: "private",
                        name: "Juan Pérez",
                        username: "juanperez",
                        last_message: "Te quería comentar que estuve viendo tu postulación y me encantaría que te unas a mi proyecto.",
                        has_unread_messages: false,
                        profile_pic: null,
                        created_at: "2024-10-10T10:00:00Z"
                    },
                    {
                        _id: "chat_id_2",
                        type: "private",
                        name: "María Lopez",
                        username: "marialopez",
                        last_message: "Hola, ¿estás interesada en unirte a mi proyecto?",
                        has_unread_messages: true,
                        profile_pic: null,
                        created_at: "2024-10-10T10:00:00Z"
                    },
                ]);
            } else if (activeTab === 'Grupales') {
                // Ejemplo:
                setChats([
                    {
                        _id: "chat_id_3",
                        type: "group",
                        name: "Web para adoptar mascotas",
                        participants_names: ["María Fernandez", "Lara Becker"],
                        last_message: "Hola, creo que ya estamos todos!",
                        last_to_speak: "María",
                        has_unread_messages: true,
                        project_pic: null,
                        created_at: "2024-10-10T10:00:00Z"
                    },
                    {
                        _id: "chat_id_4",
                        type: "group",
                        name: "Nerdearla",
                        participants_names: ["Pedro Martínez", "Luisa Guevara", "Lara Becker", "Nilda Sosa"],
                        last_message: "¿Les parece si hacemos un meet?",
                        last_to_speak: "Pedro",
                        has_unread_messages: false,
                        project_pic: null,
                        created_at: "2024-10-10T10:00:00Z"
                    },
                ]);
            }
        };
        fetchChats();

        setSelectedChat(null); // Limpiar chat seleccionado al cambiar de tab
    }, [activeTab]);

    // Seleccionar el primer chat por defecto
    useEffect(() => {
        if (!isMobileView && chats.length > 0) {
            setSelectedChat(chats[0]);
        }
    }, [chats, isMobileView]);

    const hasChats = chats.length > 0;

    return (
        <main>
            <div className="container messages-page">

                {/* Vista mobile: mostrar listado de chats */}
                {isMobileView && !selectedChat ? (
                    <div className="messages-page__chat-list">
                        <h1 className="title-40">Mensajes</h1>

                        <ChatList
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            chats={chats}
                            selectedChat={selectedChat}
                            onSelectChat={setSelectedChat}
                            isMobileView={isMobileView}
                        />
                    </div>
                ) : isMobileView && selectedChat ? (

                    // Vista mobile: mostrar el chat seleccionado
                    <ChatView
                        activeTab={activeTab}
                        chat={selectedChat}
                        hasChats={hasChats}
                        onBack={() => setSelectedChat(null)}
                    />
                ) : (
                    // Vista desktop: mostrar listado de chats + chat seleccionado
                    <div className="messages-page__desktop">

                        <div className="messages-page__chat-list">
                            <h1 className="title-40">Mensajes</h1>

                            <ChatList
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                chats={chats}
                                selectedChat={selectedChat}
                                onSelectChat={setSelectedChat}
                            />
                        </div>

                        <ChatView
                            activeTab={activeTab}
                            chat={selectedChat}
                            hasChats={hasChats}
                        />

                    </div>
                )}

            </div>
        </main>
    )
}

export default MessagesPage;