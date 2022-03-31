import { useCallback } from 'react';
import { Message } from '../../domain';
import { useChatStorage } from '../../services';

export const useSetMessage = () => {
  const { setMessage: storageSetMessage } = useChatStorage();

  const setMessage = useCallback(
    (chatId: string, message: Message) => {
      storageSetMessage(chatId, message);
    },
    [storageSetMessage],
  );

  return { setMessage };
};
