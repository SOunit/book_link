import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter } from '../../services';
import { addUserToFollowersAction } from '../../services/store/re-ducks/follow/actions';
import { FollowAdapterService } from '../ports';

export const useFollowInUserDetail = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const dispatch = useDispatch();

  const followInUserDetail = (followingUser: User, followerUser: User) => {
    dispatch(addUserToFollowersAction(followingUser));
    followAdapter.createFollowing(followingUser.id, followerUser.id);
  };

  return {
    followInUserDetail,
  };
};
