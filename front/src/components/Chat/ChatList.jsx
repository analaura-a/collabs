import ChatTabs from "../Tabs/ChatTabs";
import ChatItem from "./ChatItem";

const ChatList = ({ activeTab, setActiveTab, chats, selectedChat, onSelectChat }) => {

    return (
        <div className="messages-page__chat-list-with-tabs">
            <ChatTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="messages-page__chat-list__chat-items">
                {chats.length > 0 ? (
                    chats.map((chat) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            onClick={() => onSelectChat(chat)}
                            isSelected={selectedChat === chat}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ChatList;