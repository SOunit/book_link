import { SET_SEARCHED_ITEMS } from './constants';
import { SearchActionTypes } from './types';

const initialState = {
  searchedItems: [],
};

export const searchReducer = (
  state = initialState,
  action: SearchActionTypes,
) => {
  switch (action.type) {
    case SET_SEARCHED_ITEMS: {
      const searchedItems = action.payload.searchedItems;
      return { ...state, searchedItems };
    }

    default:
      return state;
  }
};
