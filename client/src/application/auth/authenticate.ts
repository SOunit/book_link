import { useAuth } from '../../services';
import { useUserStorage } from '../../services';
import { AuthenticateService, UserStorageService } from '../ports';

export const useAuthenticate = () => {
  const storage: UserStorageService = useUserStorage();
  const authAdapter: AuthenticateService = useAuth();

  const authenticate = () => {
    authAdapter
      .auth()
      .then((loginId) => {
        if (loginId) {
          storage.login(loginId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    authAdapter.logout();
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
