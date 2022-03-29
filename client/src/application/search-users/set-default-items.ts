import { useCallback } from 'react';
import {
  useItemAdapter,
  useSearchStorage,
  useUserStorage,
} from '../../services';
import { SearchStorageService } from '../ports';

export const useSetDefaultItems = () => {
  const { loginUser } = useUserStorage();
  const { fetchRandomItems } = useItemAdapter();
  const { setRegisteredItems }: SearchStorageService = useSearchStorage();

  const setDefaultItems = useCallback(async () => {
    if (!loginUser || !loginUser.items) {
      return;
    }

    let defaultItems = loginUser.items;

    if (defaultItems.length === 0) {
      const response = await fetchRandomItems();
      defaultItems = response.data.data.fetchRandomItems;
    }

    setRegisteredItems(defaultItems);
  }, [loginUser, fetchRandomItems, setRegisteredItems]);

  return {
    setDefaultItems,
  };
};
