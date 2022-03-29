import { FC, useEffect, useState } from 'react';
import { Chat } from '../../../domain';
import { useChatAdapter, useAuthStorage } from '../../../services';
import { NotFoundMessage, Spinner } from '../../components/molecules';
import { ChatList as ChatLogList } from '../../components/organisms';
import classes from './chat-list.module.scss';

export const ChatList: FC = () => {
  const { loginUser } = useAuthStorage();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const chatAdapter = useChatAdapter();

  useEffect(() => {
    if (loginUser) {
      chatAdapter
        .fetchChatList(loginUser.id)
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

  return (
    <div>
      {isLoading && <Spinner className={classes['spinner']} />}
      {!isLoading && chats && chats.length === 0 && (
        <NotFoundMessage
          title="No Chat Found"
          text="Let's chat with somebody."
        />
      )}
      {!isLoading && chats && <ChatLogList chatList={chats} />}
    </div>
  );
};
