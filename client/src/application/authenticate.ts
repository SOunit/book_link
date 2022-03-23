import { useAuth } from '../services';
import { useUserStorage } from '../services';
import { AuthenticateService, UserStorageService } from './ports';

export const useAuthenticate = () => {
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticateService = useAuth();

  const authenticate = () => {
    const loginId = auth.auth();
    storage.login(loginId);
  };

  const logout = () => {
    auth.logout();
    storage.logout();
  };

  return {
    authenticate,
    logout,
  };
};
