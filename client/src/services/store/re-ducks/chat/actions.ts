import { Chat } from '../../../../domain';
import { ADD_CHAT, INIT_CHAT_LIST } from './constants';
import { ChatActionTypes } from './types';

export const initChatListAction = (chatList: Chat[]): ChatActionTypes => {
  return { type: INIT_CHAT_LIST, payload: { chatList } };
};

export const addChatAction = (chat: Chat): ChatActionTypes => {
  return { type: ADD_CHAT, payload: { chat } };
};
