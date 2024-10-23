import ChatTabs from "../Tabs/ChatTabs";
import ChatItem from "./ChatItem";

const ChatList = ({ activeTab, setActiveTab, chats, selectedChat, onSelectChat, isMobileView }) => {

    return (
        <div className="messages-page__chat-list-with-tabs">
            <ChatTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="messages-page__chat-list__chat-items">
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <ChatItem
                            key={chat._id}
                            chat={chat}
                            onClick={() => onSelectChat(chat)}
                            isSelected={selectedChat === chat}
                        />
                    ))
                ) : (
                    <>
                        {/* Empty state para vista mobile */}
                        {isMobileView && activeTab === 'Privados' ? (
                            <p className="light-paragraph">No tienes chats privados.</p>
                        ) : isMobileView && activeTab === 'Grupales' ? (
                            <p className="light-paragraph">No tienes chats grupales.</p>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatList;