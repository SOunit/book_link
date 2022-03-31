import { Chat } from '../../../../domain';
import {
  ADD_CHAT,
  ADD_MESSAGE_TO_CHAT,
  INIT_CHAT,
  INIT_CHAT_LIST,
  SET_MESSAGE,
} from './constants';
import { ChatActionTypes, ChatState } from './types';

const initialState: ChatState = {
  chatList: [],
  chat: undefined,
};

export const chatReducer = (state = initialState, action: ChatActionTypes) => {
  switch (action.type) {
    case INIT_CHAT_LIST: {
      const { chatList } = action.payload;

      return { ...state, chatList };
    }

    case INIT_CHAT: {
      const { chat } = action.payload;
      return { ...state, chat };
    }

    case ADD_CHAT: {
      const { chat } = action.payload;
      const newChatList = [...state.chatList, chat];

      return { ...state, chatList: newChatList };
    }

    case SET_MESSAGE: {
      const { chatId, message } = action.payload;

      // deep copy of array
      const newChatList = JSON.parse(JSON.stringify(state.chatList)) as Chat[];
      const chatIndex = newChatList.findIndex((chat) => chat.id === chatId);

      if (chatIndex >= 0) {
        newChatList[chatIndex].messages[0] = message;
      }

      return { ...state, chatList: newChatList };
    }

    case ADD_MESSAGE_TO_CHAT: {
      const { message } = action.payload;

      const messages = state.chat?.messages;
      if (messages && messages.find((msg) => msg.id === message.id)) {
        return state;
      }

      const newChat = { ...state.chat };
      if (newChat && newChat.messages) {
        const newMessages = [...newChat.messages, message];
        newChat.messages = newMessages;
      }

      return { ...state, chat: newChat };
    }

    default:
      return state;
  }
};
