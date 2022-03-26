import { useDispatch } from 'react-redux';
import { useSearchStorage, useUserAdapter } from '../../services';
import { setSearchedUsersAction } from '../../services/store/re-ducks/search/actions';

export const useSearchUsers = () => {
  const userAdapter = useUserAdapter();
  const storage = useSearchStorage();
  const dispatch = useDispatch();

  const searchUsers = async (loginUserId: string) => {
    // fetch user data
    const itemIds = storage.registeredItems.map((item) => item.id);
    const response = await userAdapter.fetchUsersByItems(itemIds, loginUserId);
    const searchedUsers = response.data.data.getUsersByItems;

    dispatch(setSearchedUsersAction(searchedUsers));
  };

  return { searchUsers };
};
