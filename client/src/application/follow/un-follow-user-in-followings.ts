import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { updateIsFollowingInFollowingsAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useUnFollowUserInFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const unFollowUserInFollowings = (
    followingUser: User,
    followerUser: User,
  ) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, false));
  };

  return {
    unFollowUserInFollowings,
  };
};
