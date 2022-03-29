import { Action } from 'redux';
import { Chat } from '../../../../domain';
import { ADD_CHAT, INIT_CHAT_LIST } from './constants';

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

export type ChatActionTypes = InitChatListAction | AddChatAction;
