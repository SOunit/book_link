import { useDispatch } from 'react-redux';
import { useItemAdapter, useSearchStorage } from '../../services';
import { setSearchedItemsAction } from '../../services/store/re-ducks/search/actions';

export const useSearchItems = () => {
  const itemAdapter = useItemAdapter();
  const storage = useSearchStorage();
  const dispatch = useDispatch();

  const searchItems = async (searchTerm: string) => {
    const response = await itemAdapter.fetchItemsByTitle(searchTerm);
    const searchedItems = response.data.data.itemsByTitle;

    dispatch(setSearchedItemsAction(searchedItems));
  };

  return { searchItems };
};
