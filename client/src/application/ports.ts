export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: () => void;
  logout: () => void;
  loginUser: null;
  setLoginUser: () => void;
}
