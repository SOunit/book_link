import { Chat } from '../../../../domain';
import { INIT_CHAT_LIST } from './constants';
import { ChatActionTypes } from './types';

export const initChatListAction = (chatList: Chat[]): ChatActionTypes => {
  return { type: INIT_CHAT_LIST, payload: { chatList } };
};
