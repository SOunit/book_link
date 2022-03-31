import { Chat, Message } from '../../../../domain';
import {
  ADD_CHAT,
  ADD_MESSAGE_TO_CHAT,
  INIT_CHAT,
  INIT_CHAT_LIST,
  SET_MESSAGE,
} from './constants';
import { ChatActionTypes } from './types';

// chat-list
export const initChatListAction = (chatList: Chat[]): ChatActionTypes => {
  return { type: INIT_CHAT_LIST, payload: { chatList } };
};

export const addChatAction = (chat: Chat): ChatActionTypes => {
  return { type: ADD_CHAT, payload: { chat } };
};

export const setMessageAction = (
  chatId: string,
  message: Message,
): ChatActionTypes => {
  return { type: SET_MESSAGE, payload: { chatId, message } };
};

// chat
export const initChatAction = (chat: Chat): ChatActionTypes => {
  return { type: INIT_CHAT, payload: { chat } };
};

export const addMessageToChatAction = (message: Message): ChatActionTypes => {
  return { type: ADD_MESSAGE_TO_CHAT, payload: { message } };
};
