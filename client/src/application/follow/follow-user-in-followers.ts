import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import {
  addUserToFollowingsAction,
  UpdateIsFollowingInFollowersAction,
} from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useFollowUserInFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const followUserInFollowers = (
    followingUser: User,
    followerUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    if (pageUser.id === loginUser.id) {
      // add follower user to followings of loginUser
      dispatch(addUserToFollowingsAction(followerUser));
    }
    dispatch(UpdateIsFollowingInFollowersAction(followerUser, true));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    followUserInFollowers,
  };
};
