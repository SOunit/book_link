import { Item } from '../../../../domain';
import {
  REGISTER_ITEM,
  SET_SEARCHED_ITEMS,
  UN_REGISTER_ITEM,
} from './constants';
import { SearchActionTypes } from './types';

export const setSearchedItemsAction = (
  searchedItems: Item[],
): SearchActionTypes => {
  return { type: SET_SEARCHED_ITEMS, payload: { searchedItems } };
};

export const registerItemAction = (item: Item): SearchActionTypes => {
  return { type: REGISTER_ITEM, payload: { item } };
};

export const unRegisterItemAction = (itemId: string): SearchActionTypes => {
  return { type: UN_REGISTER_ITEM, payload: { itemId } };
};
