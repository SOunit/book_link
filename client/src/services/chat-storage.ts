import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chat, Message } from '../domain';
import {
  addChatAction,
  addMessageToChatAction,
  initChatAction,
  initChatListAction,
} from './store/re-ducks/chat/actions';
import { RootState } from './store/store';

export const useChatStorage = () => {
  const dispatch = useDispatch();
  const chatState = useSelector((state: RootState) => state.chat);

  const initChatList = useCallback(
    (chatList: Chat[]) => {
      dispatch(initChatListAction(chatList));
    },
    [dispatch],
  );

  const addChat = (chat: Chat) => {
    dispatch(addChatAction(chat));
  };

  const addMessageToChat = useCallback(
    (chatId: string, message: Message) => {
      dispatch(addMessageToChatAction(chatId, message));
    },
    [dispatch],
  );

  const initChat = useCallback(
    (chat: Chat) => {
      dispatch(initChatAction(chat));
    },
    [dispatch],
  );

  return {
    ...chatState,
    initChatList,
    addChat,
    addMessageToChat,
    initChat,
  };
};
