import { Message } from '../../domain';
import { useChatAdapter, useSocketAdapter } from '../../services';

export const useCreateMessage = () => {
  const chatAdapter = useChatAdapter();
  const socketAdapter = useSocketAdapter();

  const createMessage = (
    chatId: string,
    userId: string,
    messageText: string,
    loginUserId: string,
  ) => {
    chatAdapter.createMessage(chatId, userId, messageText).then((res) => {
      const message: Message = res.data.data.createMessage;
      console.log('message', message);

      socketAdapter.createMessage(loginUserId, userId, message);
    });
  };

  return {
    createMessage,
  };
};
