import { User } from '../domain';

export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: (token?: string) => void;
  logout: () => void;
  loginUser: null;
  updateLoginUser: (user: User) => void;
}

export interface ImageStorageService {
  uploadImage: (image: File) => string | null;
}

export interface AuthenticateService {
  auth(): Promise<any>;
  logout(): void;
}
