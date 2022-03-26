import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import {
  removeUserFromFollowersAction,
  UpdateIsFollowingInFollowersAction,
} from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useRemoveUserFromFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const removeUserFromFollowers = (followingUser: User) => {
    dispatch(removeUserFromFollowersAction(followingUser));
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
      dispatch(UpdateIsFollowingInFollowersAction(followerUser, toFollowing));

      // update db
      followAdapter.deleteFollowing(followingUser.id, followerUser.id);
    }
  };

  return {
    removeFollowerUserFromFollowers,
  };
};
