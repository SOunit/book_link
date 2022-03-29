import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chat } from '../domain';
import { initChatListAction } from './store/re-ducks/chat/actions';
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

  return {
    ...chatState,
    initChatList,
  };
};
