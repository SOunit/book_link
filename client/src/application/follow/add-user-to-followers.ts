import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  ADD_USER_TO_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useAddUserToFollowers = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const addUserToFollowers = (followers: User[], followerUser: User) => {
    const exists = followers.some(
      (follower) => follower.id === followerUser.id,
    );

    if (!exists) {
      if (followerUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWERS, payload: followerUser });
      }
    }
  };

  // FIXME
  // summarize use-case
  // 1. receive what, followingUser, followerUser, pageUser, loginUser
  // 2. do what, add followerUser to followers
  // name and behavior is different

  // page unique: user detail
  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    console.log('addFollowerUserToFollowers');

    const toFollowing = true;

    // follow page user, add login user to followers of page user
    if (pageUser.id === followerUser.id) {
      addUserToFollowers(storage.followers, followingUser);
    }

    // update IsFollowing flag
    dispatch({
      type: UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
      payload: { followingUser, toFollowing },
    });

    followAdapter.createFollowing(followingUser.id, loginUser.id);
  };

  return {
    addFollowerUserToFollowers,
  };
};
