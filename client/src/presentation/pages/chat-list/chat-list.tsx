import { FC, useContext, useEffect, useState } from 'react';
import { ChatAdapter } from '../../../services';
import { Chat } from '../../../domain';
import {
  ChatListItem,
  NotFoundMessage,
  Spinner,
} from '../../components/molecules';
import { AuthContext } from '../../../services/store';
import classes from './chat-list.module.scss';

export const ChatList: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loginUser) {
      ChatAdapter.fetchChatList(loginUser.id)
        .then((res) => {
          const chats = res.data.data.getUserChatList;
          setChats(chats);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [loginUser]);

  let chatList = null;
  if (chats && loginUser) {
    chatList = chats.map((chat) => <ChatListItem chat={chat} key={chat.id} />);
  }

  return (
    <div>
      {isLoading && <Spinner className={classes['spinner']} />}
      {!isLoading && chatList && chatList.length === 0 && (
        <NotFoundMessage
          title="No Chat Found"
          text="Let's chat with somebody."
        />
      )}
      {!isLoading && chatList}
    </div>
  );
};
