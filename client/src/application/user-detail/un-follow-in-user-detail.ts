import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { removeUserFromFollowersAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useUnFollowInUserDetail = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const unFollowInUserDetail = (followingUser: User, followerUser: User) => {
    dispatch(removeUserFromFollowersAction(followingUser));
    followAdapter.deleteFollowing(followingUser.id, followerUser.id);
  };

  return {
    unFollowInUserDetail,
  };
};
