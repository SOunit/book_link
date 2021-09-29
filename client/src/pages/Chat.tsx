import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useLoginUser from '../hooks/use-login-user';
import ChatServices from '../services/chatServices';
import ChatType from '../models/Chat';
import MessageType from '../models/Message';

type ChatProps = {};

type UserDetailParams = {
  userId: string;
};

const Chat: FC<ChatProps> = (props) => {
  const { loginUser } = useLoginUser();
  const { userId } = useParams<UserDetailParams>();
  const [chat, setChat] = useState<ChatType | null>(null);

  const fetchChat = (userIds: string[]) => {
    const [userId1, userId2] = userIds;
    console.log('userId1', userId1, 'userId2', userId2);
    return ChatServices.fetchChat([userId1, userId2]);
  };

  useEffect(() => {
    if (loginUser) {
      fetchChat([loginUser.id, userId]).then((res) => {
        const chat = res.data.data.getUserChat;
        console.log(chat);
        setChat(chat);
      });
    }
  }, [loginUser, userId]);

  let messages;
  if (chat) {
    messages = chat.messages.map((message: MessageType) => (
      <div key={message.id}>{message.text}</div>
    ));
  }

  return <div>{messages}</div>;
};

export default Chat;
