import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import {
  REMOVE_USER_FROM_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService } from '../ports';

export const useRemoveUserFromFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const removeUserFromFollowers = (followingUser: User) => {
    dispatch({ type: REMOVE_USER_FROM_FOLLOWERS, payload: followingUser.id });
  };

  const removeFollowerUserFromFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
  ) => {
    const toFollowing = false;

    if (followingUser.id) {
      // remove user from followers if exists
      if (pageUser.id === followerUser.id) {
        removeUserFromFollowers(followingUser);
      }

      // update state
      dispatch({
        type: UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
        payload: { followerUser, toFollowing },
      });

      // update db
      followAdapter.deleteFollowing(followingUser.id, followerUser.id);
    }
  };

  return {
    removeFollowerUserFromFollowers,
  };
};
