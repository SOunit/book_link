import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { updateIsFollowingInFollowingsAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useUnFollowUserInFollowings = () => {
  const dispatch = useDispatch();
  const followAdapter: FollowAdapterService = useFollowAdapter();

  const unFollowUserInFollowings = (
    followingUser: User,
    followerUser: User,
  ) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, false));
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return {
    unFollowUserInFollowings,
  };
};
