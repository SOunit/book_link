import { useGoogleAuth } from '../services';
import { useUserStorage } from '../services';
import { AuthenticateService, UserStorageService } from './ports';

export const useAuthenticate = () => {
  const storage: UserStorageService = useUserStorage();
  const googleAuth: AuthenticateService = useGoogleAuth();

  const authenticate = () => {
    const loginId = googleAuth.auth();
    storage.login(loginId);
  };

  const logout = () => {};

  return {
    authenticate,
    logout,
  };
};
