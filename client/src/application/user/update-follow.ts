import { useDispatch } from 'react-redux';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  INIT_FOLLOWINGS,
  INIT_FOLLOWERS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowStorageService } from '../ports';

export const useUpdateFollow = () => {
  const followAdapter = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const getData = () => {
    return storage;
  };

  const initData = (targetUserId: string, loginUserId: string) => {
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
  };

  return {
    initData,
    getData,
  };
};
