import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { followUserAction } from '../../services/store/re-ducks/search/actions';

export const useFollowUser = () => {
  const followAdapter = useFollowAdapter();
  const dispatch = useDispatch();

  const followUser = (followingUser: User, followerUser: User) => {
    dispatch(followUserAction(followingUser, followerUser));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return { followUser };
};
