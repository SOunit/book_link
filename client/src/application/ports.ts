export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: (token?: string) => void;
  logout: () => void;
  loginUser: null;
  updateLoginUser: () => void;
}

export interface AuthenticateService {
  // auth(name: string, email: string): Promise<User>;
  auth(): string;
}
