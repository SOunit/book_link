import { Item } from '../../../../domain';
import { SET_SEARCHED_ITEMS } from './constants';

interface SetSearchedItemsAction {
  type: typeof SET_SEARCHED_ITEMS;
  payload: { searchedItems: Item[] };
}

export type SearchActionTypes = SetSearchedItemsAction;
