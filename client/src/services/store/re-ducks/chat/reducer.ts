import { ChatActionTypes, ChatState } from './types';

const initialState: ChatState = {
  chatList: [],
};

export const chatReducer = (state = initialState, action: ChatActionTypes) => {
  return state;
};
