import { Action } from 'redux';
import { Chat, Message } from '../../../../domain';
import { ADD_CHAT, ADD_MESSAGE_TO_CHAT, INIT_CHAT_LIST } from './constants';

export type ChatState = {
  chatList: Chat[];
};

interface InitChatListAction extends Action {
  type: typeof INIT_CHAT_LIST;
  payload: { chatList: Chat[] };
}

interface AddChatAction extends Action {
  type: typeof ADD_CHAT;
  payload: { chat: Chat };
}

interface addMessageToChatAction extends Action {
  type: typeof ADD_MESSAGE_TO_CHAT;
  payload: { chatId: string; message: Message };
}

export type ChatActionTypes =
  | InitChatListAction
  | AddChatAction
  | addMessageToChatAction;
