import { useState, useEffect } from 'react';
import { getUserChats } from '../../services/chatService';
import { useToast } from '../../context/ToastContext';
import ChatList from '../../components/Chat/ChatList';
import ChatView from '../../components/Chat/ChatView';
import Loader from '../../components/Loader/Loader';

const MessagesPage = () => {

    const [activeTab, setActiveTab] = useState('Privados');

    const [chats, setChats] = useState([]); // Lista de chats para la tab actual
    const [selectedChat, setSelectedChat] = useState(null);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 800);

    const [loading, setLoading] = useState(true);

    const { addToast } = useToast();

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
    const fetchChats = async () => {
        try {
            // Obtener chats y filtrarlos
            const userChats = await getUserChats();

            const filteredChats = userChats.filter(chat =>
                activeTab === 'Privados' ? chat.type === 'private' : chat.type === 'group'
            );

            setChats(filteredChats);

            // Mantener o asignar el chat seleccionado
            if (!isMobileView) {
                if (selectedChat) {
                    const updatedSelectedChat = filteredChats.find(chat => chat._id === selectedChat._id);
                    setSelectedChat(updatedSelectedChat || filteredChats[0] || null);
                } else {
                    setSelectedChat(filteredChats[0] || null);
                }
            } else {
                if (selectedChat) {
                    const updatedSelectedChat = filteredChats.find(chat => chat._id === selectedChat._id);
                    setSelectedChat(updatedSelectedChat || null);
                } else {
                    setSelectedChat(null);
                }
            }

            setLoading(false);
        } catch (error) {
            addToast({
                type: 'error',
                title: 'Error al cargar los chats',
                message: 'Ocurrió un error desconocido al intentar cargar tus chats. Inténtalo de nuevo más tarde.'
            });

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChats();
    }, [activeTab, isMobileView]);

    const hasChats = chats.length > 0;

    if (loading) {
        return <Loader />;
    }

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
                        refreshChats={fetchChats}
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
                            refreshChats={fetchChats}
                        />

                    </div>
                )}

            </div>
        </main>
    )
}

export default MessagesPage;