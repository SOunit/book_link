import { INIT_CHAT_LIST } from './constants';
import { ChatActionTypes, ChatState } from './types';

const initialState: ChatState = {
  chatList: [],
};

export const chatReducer = (state = initialState, action: ChatActionTypes) => {
  switch (action.type) {
    case INIT_CHAT_LIST: {
      console.log(INIT_CHAT_LIST);

      const { chatList } = action.payload;

      console.log('chatList', chatList);

      return { ...state, chatList };
    }

    default:
      return state;
  }
};
