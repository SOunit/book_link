import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  INIT_FOLLOWERS,
  INIT_FOLLOWINGS,
  INIT_IS_LOADED,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useInitFollow = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const initIsLoaded = useCallback(() => {
    dispatch({ type: INIT_IS_LOADED });
  }, [dispatch]);

  const initFollow = useCallback(
    (targetUserId: string, loginUserId: string) => {
      if (!storage.isFollowingsLoaded) {
        followAdapter
          .fetchFollowingUsers(targetUserId, loginUserId)
          .then((res) => {
            const followings = res.data.data.getFollowingUsers;
            dispatch({ type: INIT_FOLLOWINGS, payload: followings });
          });
      }

      if (!storage.isFollowersLoaded) {
        followAdapter
          .fetchFollowerUsers(targetUserId, loginUserId)
          .then((res) => {
            const followers = res.data.data.getFollowerUsers;
            dispatch({ type: INIT_FOLLOWERS, payload: followers });
          });
      }
    },
    [dispatch, followAdapter, storage],
  );
  return { initFollow, initIsLoaded };
};
