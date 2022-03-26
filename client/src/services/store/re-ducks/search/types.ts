import { Item } from '../../../../domain';
import {
  REGISTER_ITEM,
  SET_SEARCHED_ITEMS,
  UN_REGISTER_ITEM,
} from './constants';

export type SearchState = {
  searchedItems: Item[];
  registeredItems: Item[];
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

export type SearchActionTypes =
  | SetSearchedItemsAction
  | RegisterItemAction
  | UnRegisterItemAction;
