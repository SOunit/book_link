import { useCallback, useState } from 'react';
import { useRegisterItem, useUnRegisterItem } from '../../../application';
import { Item } from '../../../domain/';

export const useRegisteredItems = () => {
  const [registeredItems, setRegisteredItems] = useState<Item[]>([]);
  const { registerItem } = useRegisterItem();
  const { unRegisterItem } = useUnRegisterItem();

  const deleteRegisteredItemHandler = (id: string) => {
    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState].filter(
        (elm) => elm.id !== id,
      );
      return updatedRegisteredItems;
    });

    unRegisterItem(id);
  };

  const initItemsHandler = useCallback((items: Item[]) => {
    setRegisteredItems(items);
  }, []);

  const addRegisteredItemHandler = (item: Item) => {
    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState];

      const match = updatedRegisteredItems.some((elem) => elem.id === item.id);
      if (match) {
        return prevState;
      }

      updatedRegisteredItems.push(item);
      return updatedRegisteredItems;
    });

    registerItem(item);
  };

  return {
    registeredItems,
    initItemsHandler,
    deleteRegisteredItemHandler,
    addRegisteredItemHandler,
  };
};

export default useRegisteredItems;
