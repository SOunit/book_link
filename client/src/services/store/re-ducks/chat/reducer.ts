import { ADD_CHAT, INIT_CHAT_LIST } from './constants';
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

    default:
      return state;
  }
};
