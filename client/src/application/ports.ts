import { Item, User } from '../domain';

export interface UserStorageService {
  token: '';
  isLoggedIn: false;
  login: (token?: string) => void;
  logout: () => void;
  loginUser: null;
  updateLoginUser: (user: User) => void;
}

export interface ImageStorageService {
  uploadImage: (image: File) => Promise<string | undefined>;
}

export interface FollowStorageService {
  followings: any[];
  followers: any[];
  isFollowersLoaded: boolean;
  isFollowingsLoaded: boolean;
}

export interface SearchStorageService {
  isItemSearched: boolean;
  searchedItems: Item[];
  registeredItems: Item[];
  searchedUsers: User[];
}

export interface FollowAdapterService {
  fetchFollowingUsers(targetUserId: string, loginUserId: string): Promise<any>;
  fetchFollowerUsers(targetUserId: string, loginUserId: string): Promise<any>;
  createFollowing(followingUserId: string, userId: string): Promise<any>;
  deleteFollowing(followingUserId: string, userId: string): Promise<any>;
}

export interface AuthTokenStorageService {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export interface AuthenticateService {
  auth(): Promise<any>;
  logout(): void;
}
