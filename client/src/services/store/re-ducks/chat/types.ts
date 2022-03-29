import { Action } from 'redux';
import { Chat } from '../../../../domain';
import { INIT_CHAT_LIST } from './constants';

export type ChatState = {
  chatList: Chat[];
};

interface InitChatListAction extends Action {
  type: typeof INIT_CHAT_LIST;
}

export type ChatActionTypes = InitChatListAction;
