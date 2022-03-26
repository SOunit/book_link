import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { addUserToFollowersAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useFollowUserInPageUser = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const followUserInPageUser = (followingUser: User, followerUser: User) => {
    dispatch(addUserToFollowersAction(followingUser));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return { followUserInPageUser };
};
