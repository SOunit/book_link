import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { unFollowUserAction } from '../../services/store/re-ducks/search/actions';

export const useUnFollowUser = () => {
  const followAdapter = useFollowAdapter();
  const dispatch = useDispatch();

  const unFollowUser = (followingUser: User, followerUser: User) => {
    dispatch(unFollowUserAction(followingUser, followerUser));
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return { unFollowUser };
};
