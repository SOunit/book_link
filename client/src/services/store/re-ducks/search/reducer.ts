import {
  REGISTER_ITEM,
  SET_REGISTERED_ITEMS,
  SET_SEARCHED_ITEMS,
  SET_SEARCHED_USERS,
  UN_REGISTER_ITEM,
  UPDATE_IS_ITEM_SEARCHED,
} from './constants';
import { SearchActionTypes, SearchState } from './types';

const initialState: SearchState = {
  isItemSearched: false,
  searchedItems: [],
  registeredItems: [],
  searchedUsers: [],
};

export const searchReducer = (
  state = initialState,
  action: SearchActionTypes,
) => {
  switch (action.type) {
    case UPDATE_IS_ITEM_SEARCHED: {
      const { isItemSearched } = action.payload;
      return { ...state, isItemSearched };
    }

    case SET_SEARCHED_ITEMS: {
      const { searchedItems } = action.payload;
      return { ...state, searchedItems };
    }

    case REGISTER_ITEM: {
      const { item } = action.payload;
      const newRegisteredItems = [...state.registeredItems, item];
      return { ...state, registeredItems: newRegisteredItems };
    }

    case UN_REGISTER_ITEM: {
      const { itemId } = action.payload;
      const newRegisteredItems = state.registeredItems.filter(
        (item) => item.id !== itemId,
      );
      return { ...state, registeredItems: newRegisteredItems };
    }

    case SET_REGISTERED_ITEMS: {
      const { items } = action.payload;
      return { ...state, registeredItems: items };
    }

    case SET_SEARCHED_USERS: {
      const { users: searchedUsers } = action.payload;
      return { ...state, searchedUsers };
    }

    default:
      return state;
  }
};
