import { Item, User } from '../../../../domain';
import {
  REGISTER_ITEM,
  SET_SEARCHED_ITEMS,
  SET_SEARCHED_USERS,
  UN_REGISTER_ITEM,
  UPDATE_IS_ITEM_SEARCHED,
} from './constants';

export type SearchState = {
  isItemSearched: boolean;
  searchedItems: Item[];
  registeredItems: Item[];
  searchedUsers: User[];
};

interface SetSearchedItemsAction {
  type: typeof SET_SEARCHED_ITEMS;
  payload: { searchedItems: Item[] };
}

interface UpdateIsItemSearched {
  type: typeof UPDATE_IS_ITEM_SEARCHED;
  payload: { isItemSearched: boolean };
}

interface RegisterItemAction {
  type: typeof REGISTER_ITEM;
  payload: { item: Item };
}

interface UnRegisterItemAction {
  type: typeof UN_REGISTER_ITEM;
  payload: { itemId: string };
}

interface SetSearchedUsersAction {
  type: typeof SET_SEARCHED_USERS;
  payload: { users: User[] };
}

export type SearchActionTypes =
  | SetSearchedItemsAction
  | RegisterItemAction
  | UnRegisterItemAction
  | SetSearchedUsersAction
  | UpdateIsItemSearched;
