import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import { UPDATE_IS_FOLLOWING_IN_FOLLOWINGS } from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useRemoveUserFromFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const removeFollowingUserFromFollowings = (
    followingUser: User,
    loginUser: User,
  ) => {
    const toFollowing = false;

    if (storage.followings && storage.followers && loginUser.id) {
      // update state
      dispatch({
        type: UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
        payload: {
          targetUserId: followingUser.id,
          isFollowingState: toFollowing,
        },
      });

      // update db
      followAdapter.deleteFollowing(loginUser.id, followingUser.id);
    }
  };

  return {
    removeFollowingUserFromFollowings,
  };
};
