import { FC, useContext, useEffect, useState } from 'react';
import ChatServices from '../services/chatServices';
import ChatType from '../models/Chat';
import ChatListItem from '../components/molecules/chatListItem/ChatListItem';
import AuthContext from '../store/auth-context';

const ChatList: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    if (loginUser) {
      ChatServices.fetchChatList(loginUser.id).then((res) => {
        const chats = res.data.data.getUserChatList;

        setChats(chats);
      });
    }
  }, [loginUser]);

  let chatList = null;
  if (chats && loginUser) {
    chatList = chats.map((chat) => <ChatListItem chat={chat} key={chat.id} />);
  }

  return <div>{chatList}</div>;
};

export default ChatList;
