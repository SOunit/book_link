import { useCallback } from 'react';
import { Message } from '../../domain';
import { useChatStorage } from '../../services';

export const useAddMessageToChat = () => {
  const { addMessageToChat: storageAddMessageToChat } = useChatStorage();

  const addMessageToChat = useCallback(
    (chatId: string, message: Message) => {
      storageAddMessageToChat(chatId, message);
    },
    [storageAddMessageToChat],
  );

  return {
    addMessageToChat,
  };
};
