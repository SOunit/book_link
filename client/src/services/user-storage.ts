import { UserStorageService } from '../application/ports';
import { useAuthContext } from './store';

export const useUserStorage = (): UserStorageService => {
  return useAuthContext() as UserStorageService;
};
