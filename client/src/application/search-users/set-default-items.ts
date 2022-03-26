import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useItemAdapter, useUserStorage } from '../../services';
import { SetRegisteredItemsAction } from '../../services/store/re-ducks/search/actions';

export const useSetDefaultItems = () => {
  const { loginUser } = useUserStorage();
  const { fetchRandomItems } = useItemAdapter();
  const dispatch = useDispatch();

  const setDefaultItems = useCallback(async () => {
    if (!loginUser || !loginUser.items) {
      return;
    }

    let defaultItems = loginUser.items;

    if (defaultItems.length === 0) {
      const response = await fetchRandomItems();
      console.log(response.data.data);
      defaultItems = response.data.data.fetchRandomItems;
    }

    dispatch(SetRegisteredItemsAction(defaultItems));
  }, [loginUser, fetchRandomItems, dispatch]);

  return {
    setDefaultItems,
  };
};
