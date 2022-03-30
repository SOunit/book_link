import {
  ADD_CHAT,
  ADD_MESSAGE_TO_CHAT,
  INIT_CHAT,
  INIT_CHAT_LIST,
} from './constants';
import { ChatActionTypes, ChatState } from './types';

const initialState: ChatState = {
  chatList: [],
  chat: { id: '', messages: [], users: [] },
};

export const chatReducer = (state = initialState, action: ChatActionTypes) => {
  switch (action.type) {
    case INIT_CHAT_LIST: {
      console.log(INIT_CHAT_LIST);
      const { chatList } = action.payload;

      return { ...state, chatList };
    }

    case INIT_CHAT: {
      console.log('INIT_CHAT');

      const { chat } = action.payload;
      return { ...state, chat };
    }

    case ADD_CHAT: {
      console.log(ADD_CHAT);
      const { chat } = action.payload;
      const newChatList = [...state.chatList, chat];

      return { ...state, chatList: newChatList };
    }

    case ADD_MESSAGE_TO_CHAT: {
      console.log(ADD_MESSAGE_TO_CHAT);

      const { chatId, message } = action.payload;

      // update chat-list
      const newChatList = [...state.chatList];
      const chatIndex = newChatList.findIndex((chat) => chat.id === chatId);
      if (chatIndex || chatIndex === 0) {
        const newMessages = [message];
        const newChat = { ...newChatList[chatIndex], messages: newMessages };
        newChatList[chatIndex] = newChat;
      }

      // update chat
      const newChat = { ...state.chat };
      if (newChat && newChat.messages) {
        const newMessages = [...newChat.messages, message];
        newChat.messages = newMessages;
      }

      return { ...state, chatList: newChatList, chat: newChat };
    }

    default:
      return state;
  }
};
