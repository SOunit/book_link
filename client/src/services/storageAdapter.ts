import { UserStorageService } from '../application/ports';
import { useAuthContext } from './store';

// use interface to de-couple application layer and service layer
// application layer only use interface, don't care implementation of service layer
// application layer can keep independent from service using interface
export const useUserStorage = (): UserStorageService => {
  return useAuthContext() as UserStorageService;
};
