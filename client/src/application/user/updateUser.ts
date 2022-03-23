import { User } from '../../domain';
import { useUser, useUserStorage } from '../../services';

import { UserStorageService } from '../ports';

export const useUpdateUser = () => {
  const storage: UserStorageService = useUserStorage();
  const userAdapter = useUser();

  const updateUser = (user: User): void => {
    userAdapter.updateUser({
      id: user.id,
      name: user.name,
      about: user.about ? user.about : '',
      imageUrl: user.imageUrl,
    });

    storage.updateLoginUser(user);
  };

  return { updateUser };
};
