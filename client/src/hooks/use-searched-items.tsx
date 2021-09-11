import { useState } from 'react';
import ItemType from '../models/Item';

const useSearchedItems = () => {
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

export default useSearchedItems;
