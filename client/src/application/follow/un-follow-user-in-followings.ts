import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { updateIsFollowingInFollowingsAction } from '../../services/store/re-ducks/follow/actions';

export const useUnFollowUserInFollowings = () => {
  const dispatch = useDispatch();

  const unFollowUserInFollowings = (followerUser: User) => {
    dispatch(updateIsFollowingInFollowingsAction(followerUser, false));
  };

  return {
    unFollowUserInFollowings,
  };
};
