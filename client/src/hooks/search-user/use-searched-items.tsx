import { useState } from 'react';
import { Item as ItemType } from '../../models';

export const useSearchedItems = () => {
  const [searchedItems, setSearchedItems] = useState<ItemType[]>([]);
  const [isItemSearched, setIsItemSearched] = useState(false);

  const updateSearchedItemsHandler = (searchedItems: ItemType[]) => {
    setSearchedItems(searchedItems);
  };

  const updateIsItemSearchedHandler = (flag: boolean = true) => {
    setIsItemSearched(flag);
  };

  return {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  };
};
