import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  initFollowersAction,
  initFollowingsAction,
  initFollowIsLoadedAction,
} from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useInitFollow = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const initIsLoaded = useCallback(() => {
    dispatch(initFollowIsLoadedAction());
  }, [dispatch]);

  const initFollow = useCallback(
    (targetUserId: string, loginUserId: string) => {
      if (!storage.isFollowingsLoaded) {
        followAdapter
          .fetchFollowingUsers(targetUserId, loginUserId)
          .then((res) => {
            const followings = res.data.data.getFollowingUsers;
            dispatch(initFollowingsAction(followings));
          });
      }

      if (!storage.isFollowersLoaded) {
        followAdapter
          .fetchFollowerUsers(targetUserId, loginUserId)
          .then((res) => {
            const followers = res.data.data.getFollowerUsers;
            dispatch(initFollowersAction(followers));
          });
      }
    },
    [dispatch, followAdapter, storage],
  );
  return { initFollow, initIsLoaded };
};
