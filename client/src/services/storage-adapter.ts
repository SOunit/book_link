import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  ImageStorageService,
  SearchStorageService,
} from '../application/ports';
import { keys } from '../presentation/util';
import { RootState } from './store/store';
import { Item, User } from '../domain';
import {
  clearSearchStateAction,
  followUserAction,
  registerItemAction,
  SetRegisteredItemsAction,
  setSearchedItemsAction,
  setSearchedUsersAction,
  unFollowUserAction,
  unRegisterItemAction,
  updateIsItemSearchedAction,
  updateIsUserSearchedAction,
} from './store/re-ducks/search/actions';

// use interface to de-couple application layer and service layer
// application layer only use interface, don't care implementation of service layer
// application layer can keep independent from service using interface

export const useSearchStorage = () => {
  const searchUserState = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const clearSearchState = useCallback(() => {
    dispatch(clearSearchStateAction());
  }, [dispatch]);

  const followUser = (followingUser: User, followerUser: User) => {
    dispatch(followUserAction(followingUser, followerUser));
  };

  const unFollowUser = (followingUser: User, followerUser: User) => {
    dispatch(unFollowUserAction(followingUser, followerUser));
  };

  const registerItem = (item: Item) => {
    dispatch(registerItemAction(item));
  };

  const unRegisterItem = (itemId: string) => {
    dispatch(unRegisterItemAction(itemId));
  };

  const setSearchedItems = (searchedItems: Item[]) => {
    dispatch(setSearchedItemsAction(searchedItems));
  };

  const setSearchedUsers = (searchedUsers: User[]) => {
    dispatch(setSearchedUsersAction(searchedUsers));
  };

  const setRegisteredItems = useCallback(
    (items: Item[]) => {
      dispatch(SetRegisteredItemsAction(items));
    },
    [dispatch],
  );

  const updateIsItemSearched = (isItemSearched: boolean) => {
    dispatch(updateIsItemSearchedAction(isItemSearched));
  };

  const updateIsUserSearched = useCallback(
    (isUserSearched: boolean) => {
      dispatch(updateIsUserSearchedAction(isUserSearched));
    },
    [dispatch],
  );

  return {
    ...searchUserState,
    clearSearchState,
    followUser,
    unFollowUser,
    registerItem,
    unRegisterItem,
    setSearchedItems,
    setSearchedUsers,
    setRegisteredItems,
    updateIsItemSearched,
    updateIsUserSearched,
  } as SearchStorageService;
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
