import {
  AuthTokenStorageService,
  FollowStorageService,
  ImageStorageService,
  SearchStorageService,
  UserStorageService,
} from '../application/ports';
import { useAuthContext } from './store';
import axios from 'axios';
import { keys } from '../presentation/util';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { useCallback } from 'react';
import {
  addUserToFollowersAction,
  addUserToFollowingsAction,
  initFollowersAction,
  initFollowingsAction,
  initFollowIsLoadedAction,
  removeUserFromFollowersAction,
  updateIsFollowingInFollowersAction,
  updateIsFollowingInFollowingsAction,
} from './store/re-ducks/follow/actions';
import { User } from '../domain';

// use interface to de-couple application layer and service layer
// application layer only use interface, don't care implementation of service layer
// application layer can keep independent from service using interface
export const useUserStorage = (): UserStorageService => {
  return useAuthContext() as UserStorageService;
};

export const useAuthTokenStorage = (): AuthTokenStorageService => {
  const getItem = useCallback((key: string): string | null => {
    return localStorage.getItem(key);
  }, []);

  const setItem = useCallback((key: string, value: string): void => {
    localStorage.setItem(key, value);
  }, []);

  const removeItem = useCallback((key: string): void => {
    localStorage.removeItem(key);
  }, []);

  return { getItem, setItem, removeItem };
};

export const useFollowStorage = () => {
  const dispatch = useDispatch();

  const followState = useSelector((state: RootState) => state.follow);

  const addUserToFollowers = (followingUser: User) => {
    dispatch(addUserToFollowersAction(followingUser));
  };

  const removeUserFromFollowers = (followingUser: User) => {
    dispatch(removeUserFromFollowersAction(followingUser));
  };

  const addUserToFollowings = (followerUser: User) => {
    dispatch(addUserToFollowingsAction(followerUser));
  };

  const updateIsFollowingInFollowings = (
    followerUser: User,
    toFollowing: boolean,
  ) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, toFollowing));
  };

  const updateIsFollowingInFollowers = (
    userInFollowers: User,
    toFollowing: boolean,
  ) => {
    dispatch(updateIsFollowingInFollowersAction(userInFollowers, toFollowing));
  };

  const initFollowIsLoaded = useCallback(() => {
    dispatch(initFollowIsLoadedAction());
  }, [dispatch]);

  const initFollowings = (followings: User[]) => {
    dispatch(initFollowingsAction(followings));
  };

  const initFollowers = (followers: User[]) => {
    dispatch(initFollowersAction(followers));
  };

  return {
    ...followState,
    addUserToFollowers,
    removeUserFromFollowers,
    addUserToFollowings,
    updateIsFollowingInFollowers,
    updateIsFollowingInFollowings,
    initFollowIsLoaded,
    initFollowings,
    initFollowers,
  } as FollowStorageService;
};

export const useSearchStorage = () => {
  return useSelector(
    (state: RootState) => state.search,
  ) as SearchStorageService;
};

export const useImageStorage = (): ImageStorageService => {
  const uploadImageToS3 = async (image: File) => {
    try {
      // get aws s3 url to upload
      const uploadConfig = await axios.get('/api/upload');

      // put data to aws s3
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          'Content-Type': image.type,
        },
      });

      const imageUrl = keys.AWS_S3_URL + uploadConfig.data.key;
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return { uploadImage: uploadImageToS3 } as ImageStorageService;
};
