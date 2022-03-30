import { ADD_CHAT, ADD_MESSAGE_TO_CHAT, INIT_CHAT_LIST } from './constants';
import { ChatActionTypes, ChatState } from './types';

const initialState: ChatState = {
  chatList: [],
};

export const chatReducer = (state = initialState, action: ChatActionTypes) => {
  switch (action.type) {
    case INIT_CHAT_LIST: {
      console.log(INIT_CHAT_LIST);
      const { chatList } = action.payload;

      return { ...state, chatList };
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
      const newChatList = [...state.chatList];

      const chatIndex = newChatList.findIndex((chat) => chat.id === chatId);

      if (chatIndex || chatIndex === 0) {
        const newMessages = [...newChatList[chatIndex].messages, message];
        const newChat = { ...newChatList[chatIndex], messages: newMessages };
        newChatList[chatIndex] = newChat;

        return { ...state, chatList: newChatList };
      }

      return { ...state };
    }

    default:
      return state;
  }
};
