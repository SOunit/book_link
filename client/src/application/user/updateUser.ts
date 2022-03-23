import { User } from '../../domain';
import { useUserStorage } from '../../services';
import { UserStorageService } from '../ports';

export const useUpdateUser = () => {
  const storage: UserStorageService = useUserStorage();

  const updateUser = (user: User): void => {
    storage.updateLoginUser(user);
  };

  return { updateUser };
};
