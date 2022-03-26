import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { updateIsFollowingInFollowingsAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useFollowUserInFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const followUserInFollowings = (followingUser: User, followerUser: User) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, true));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    followUserInFollowings,
  };
};
