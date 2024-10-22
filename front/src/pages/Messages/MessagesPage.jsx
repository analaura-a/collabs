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
            setIsMobileView(window.innerWidth <= 768);
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
                    { id: 1, name: 'Juan Pérez', lastMessage: 'Hola, ¿cómo estás?', profilePic: 'path-to-pic' },
                    { id: 2, name: 'Ana López', lastMessage: 'Sería genial empezar mañana si es posible para todos. Yo puedo a partir de las...', profilePic: 'path-to-pic' }
                ]);
            } else if (activeTab === 'Grupales') {
                // Ejemplo:
                setChats([
                    { id: 3, name: 'Proyecto Web de cuentos', lastMessage: 'María: ¡Yo también puedo!', profilePic: 'default-group-pic' },
                    { id: 4, name: 'Proyecto de Red Social', lastMessage: 'Tú: Empezamos con la división de tareas, ¿qué les parece?', profilePic: 'default-group-pic' }
                ]);
            }
        };
        fetchChats();

        setSelectedChat(null); // Limpiar chat seleccionado al cambiar de tab
    }, [activeTab]);

    // Seleccionar el primer chat por defecto
    useEffect(() => {
        if (chats.length > 0) {
            setSelectedChat(chats[0]);
        }
    }, [chats]);

    const hasChats = chats.length > 0;

    return (
        <main>
            <div className="container messages-page">

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
                    // onBack={() => setSelectedChat(null)}
                    />

                </div>

            </div>
        </main>
    )
}

export default MessagesPage;