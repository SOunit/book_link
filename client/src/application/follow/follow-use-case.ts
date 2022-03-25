import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  ADD_USER_TO_FOLLOWINGS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
  REMOVE_USER_FROM_FOLLOWERS,
  ADD_USER_TO_FOLLOWERS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUseCase = () => {
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
  // same with updateIsFollowingInFollowers?
  const updateFollowingsState = (
    targetUserId: string,
    isFollowingState: boolean,
  ) => {
    dispatch({
      type: UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
      payload: { targetUserId, isFollowingState },
    });
  };

  const updateIsFollowingInFollowers = (
    followingUser: User,
    toFollowing: boolean,
  ) => {
    dispatch({
      type: UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
      payload: { followingUser, toFollowing },
    });
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

    // follow follower user, add follower user to followings if not exist
    // FIXME: move to another method
    if (pageUser.id === loginUser.id) {
      addUserToFollowings(storage.followings, followerUser);
    }

    // follow page user, add login user to followers of page user
    if (pageUser.id === followerUser.id) {
      addUserToFollowers(storage.followers, followingUser);
    }

    // update IsFollowing flag
    updateIsFollowingInFollowers(followerUser, toFollowing);

    // FIXME: move to another method
    updateFollowingsState(followerUser.id, toFollowing);

    followAdapter.createFollowing(followingUser.id, loginUser.id);
  };

  const removeUserFromFollowers = (followingUser: User) => {
    dispatch({ type: REMOVE_USER_FROM_FOLLOWERS, payload: followingUser.id });
  };

  const removeFollowerUserFromFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
  ) => {
    const toFollowing = false;

    if (followingUser.id) {
      // remove user from followings / followers if exists
      if (pageUser.id === followerUser.id) {
        removeUserFromFollowers(followingUser);
      }

      // update state
      updateFollowingsState(followerUser.id, toFollowing);
      updateIsFollowingInFollowers(followerUser, toFollowing);

      // update db
      followAdapter.deleteFollowing(followingUser.id, followerUser.id);
    }
  };

  const addFollowingUserToFollowings = (
    followingUser: User,
    loginUser: User,
  ) => {
    const toFollowing = true;

    if (storage.followings && storage.followers && loginUser.id) {
      // update state
      updateFollowingsState(followingUser.id, toFollowing);
      updateIsFollowingInFollowers(followingUser, toFollowing);

      // update db
      followAdapter.createFollowing(loginUser.id, followingUser.id);
    }
  };

  const removeFollowingUserFromFollowings = (
    followingUser: User,
    loginUser: User,
  ) => {
    const toFollowing = false;

    if (storage.followings && storage.followers && loginUser.id) {
      // update state
      updateFollowingsState(followingUser.id, toFollowing);
      updateIsFollowingInFollowers(followingUser, toFollowing);

      // update db
      followAdapter.deleteFollowing(loginUser.id, followingUser.id);
    }
  };

  const countFollowings = (followings?: User[]) => {
    if (!followings) {
      return;
    }

    let count = 0;
    followings.forEach((following) => {
      if (following.isFollowing) {
        count++;
      }
    });

    return count;
  };

  return {
    addFollowerUserToFollowers,
    removeFollowerUserFromFollowers,
    addFollowingUserToFollowings,
    removeFollowingUserFromFollowings,
    countFollowings,
  };
};
