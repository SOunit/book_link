import { FC } from 'react';
import { useChatStorage } from '../../../services';
import { NotFoundMessage } from '../../components/molecules';
import { ChatList as ChatLogList } from '../../components/organisms';

export const ChatList: FC = () => {
  const { chatList } = useChatStorage();

  return (
    <div>
      {(!chatList || (chatList && chatList.length === 0)) && (
        <NotFoundMessage
          title="No Chat Found"
          text="Let's chat with somebody."
        />
      )}
      {chatList && <ChatLogList chatList={chatList} />}
    </div>
  );
};
