import { useState } from 'react';
import { Item as ItemType } from '../../models';

export const useSearchedItems = () => {
  const [searchedItems, setSearchedItems] = useState<ItemType[]>([]);
  const [isItemSearched, setIsItemSearched] = useState(false);

  const updateSearchedItemsHandler = (searchedItems: ItemType[]) => {
    setSearchedItems(searchedItems);
  };

  const updateIsItemSearchedHandler = () => {
    setIsItemSearched(true);
  };

  return {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  };
};
