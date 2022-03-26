import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import {
  UpdateIsFollowingInFollowersAction,
  updateIsFollowingInFollowingsAction,
} from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useUnFollowUserInFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const unFollowUserInFollowers = (followingUser: User, followerUser: User) => {
    dispatch(UpdateIsFollowingInFollowersAction(followerUser, false));
    dispatch(updateIsFollowingInFollowingsAction(followerUser, false));
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return {
    unFollowUserInFollowers,
  };
};
