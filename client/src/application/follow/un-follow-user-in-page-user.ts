import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { removeUserFromFollowersAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useUnFollowUserInPageUser = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const unFollowUserInPageUser = (followingUser: User, followerUser: User) => {
    dispatch(removeUserFromFollowersAction(followingUser));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return { unFollowUserInPageUser };
};
