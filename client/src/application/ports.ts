export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: (token?: string) => void;
  logout: () => void;
  loginUser: null;
  updateLoginUser: () => void;
}

export interface AuthenticateService {
  auth(): Promise<any>;
  logout(): void;
}
