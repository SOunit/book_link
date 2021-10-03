import { FC, useEffect, useState } from 'react';
import useLoginUser from '../hooks/use-login-user';
import ChatServices from '../services/chatServices';
import ChatType from '../models/Chat';
import ChatListItem from '../components/chatListItem/ChatListItem';

const ChatList: FC = () => {
  const { loginUser } = useLoginUser();
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
