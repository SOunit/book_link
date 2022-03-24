import { useDispatch } from 'react-redux';
import { useFollowAdapter } from '../../services';
import {
  INIT_FOLLOWINGS,
  INIT_FOLLOWERS,
} from '../../services/store/re-ducks/follow/constants';

export const useUpdateFollow = () => {
  const followAdapter = useFollowAdapter();
  const dispatch = useDispatch();

  const initData = (targetUserId: string, loginUserId: string) => {
    const followings = followAdapter.fetchFollowerUsers(
      targetUserId,
      loginUserId,
    );
    dispatch({ type: INIT_FOLLOWINGS, payload: followings });

    const followers = followAdapter.fetchFollowerUsers(
      targetUserId,
      loginUserId,
    );
    dispatch({ type: INIT_FOLLOWERS, payload: followers });
  };

  return {
    initData,
  };
};
