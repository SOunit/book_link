import {
  REGISTER_ITEM,
  SET_SEARCHED_ITEMS,
  UN_REGISTER_ITEM,
} from './constants';
import { SearchActionTypes, SearchState } from './types';

const initialState: SearchState = {
  searchedItems: [],
  registeredItems: [],
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

    case REGISTER_ITEM: {
      const item = action.payload.item;
      const newRegisteredItems = [...state.registeredItems, item];

      return { ...state, registeredItems: newRegisteredItems };
    }

    case UN_REGISTER_ITEM: {
      const itemId = action.payload.itemId;
      const newRegisteredItems = state.registeredItems.filter(
        (item) => item.id !== itemId,
      );

      return { ...state, registeredItems: newRegisteredItems };
    }

    default:
      return state;
  }
};
