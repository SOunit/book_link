import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  ADD_USER_TO_FOLLOWINGS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useAddUserToFollowings = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const addUserToFollowings = (followings: User[], followingUser: User) => {
    const exists = followings.some(
      (following) => following.id === followingUser.id,
    );

    if (!exists) {
      if (followingUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWINGS, payload: followingUser });
      }
    }
  };

  const addFollowingUserToFollowings = (
    followingUser: User,
    loginUser: User,
    pageUser: User,
  ) => {
    const toFollowing = true;

    // follow follower user, add follower user to followings if not exist
    // FIXME: move to another method
    if (pageUser.id === loginUser.id) {
      addUserToFollowings(storage.followings, followingUser);
    }

    if (storage.followings && storage.followers && loginUser.id) {
      // update state
      dispatch({
        type: UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
        payload: {
          targetUserId: followingUser.id,
          isFollowingState: toFollowing,
        },
      });

      // update db
      followAdapter.createFollowing(loginUser.id, followingUser.id);
    }
  };

  return {
    addFollowingUserToFollowings,
  };
};
