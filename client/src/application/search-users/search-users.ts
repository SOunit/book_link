import { useDispatch } from 'react-redux';
import { useSearchStorage, useUserAdapter } from '../../services';

export const useSearchUsers = () => {
  const userAdapter = useUserAdapter();
  const storage = useSearchStorage();
  const dispatch = useDispatch();

  const searchUsers = async (loginUserId: string) => {
    // fetch user data
    const itemIds = storage.searchedItems.map((item) => item.id);
    const response = await userAdapter.fetchUsersByItems(itemIds, loginUserId);
    console.log(response);
  };

  return { searchUsers };
};
