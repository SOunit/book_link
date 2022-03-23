import { useAuth } from '../services';
import { useUserStorage } from '../services';
import { AuthenticateService, UserStorageService } from './ports';

export const useAuthenticate = () => {
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticateService = useAuth();

  const authenticate = () => {
    auth
      .auth()
      .then((loginId) => {
        storage.login(loginId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    auth.logout();
    storage.logout();
  };

  const demoAuth = () => {
    storage.login('1');
  };

  return {
    demoAuth,
    authenticate,
    logout,
  };
};
