import { Item } from '../../../../domain';
import { SET_SEARCHED_ITEMS } from './constants';
import { SearchActionTypes } from './types';

export const setSearchedItemsAction = (
  searchedItems: Item[],
): SearchActionTypes => {
  return { type: SET_SEARCHED_ITEMS, payload: { searchedItems } };
};
