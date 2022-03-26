import { Item, User } from '../../../../domain';
import {
  REGISTER_ITEM,
  SET_SEARCHED_ITEMS,
  SET_SEARCHED_USERS,
  UN_REGISTER_ITEM,
} from './constants';

export type SearchState = {
  searchedItems: Item[];
  registeredItems: Item[];
  searchedUsers: User[];
};

interface SetSearchedItemsAction {
  type: typeof SET_SEARCHED_ITEMS;
  payload: { searchedItems: Item[] };
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
  | SetSearchedUsersAction;
