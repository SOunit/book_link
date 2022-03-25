import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  INIT_FOLLOWINGS,
  INIT_FOLLOWERS,
  ADD_USER_TO_FOLLOWINGS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
  REMOVE_USER_FROM_FOLLOWERS,
  INIT_IS_LOADED,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUseCase = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const initIsLoaded = useCallback(() => {
    dispatch({ type: INIT_IS_LOADED });
  }, [dispatch]);

  const initData = useCallback(
    (targetUserId: string, loginUserId: string) => {
      if (!storage.isFollowingsLoaded) {
        followAdapter
          .fetchFollowingUsers(targetUserId, loginUserId)
          .then((res) => {
            const followings = res.data.data.getFollowingUsers;
            dispatch({ type: INIT_FOLLOWINGS, payload: followings });
          });
      }

      if (!storage.isFollowersLoaded) {
        followAdapter
          .fetchFollowerUsers(targetUserId, loginUserId)
          .then((res) => {
            const followers = res.data.data.getFollowerUsers;
            dispatch({ type: INIT_FOLLOWERS, payload: followers });
          });
      }
    },
    [dispatch, followAdapter, storage],
  );

  const addUserToFollowings = (followings: User[], followerUser: User) => {
    const exists = followings.some(
      (following) => following.id === followerUser.id,
    );

    if (!exists) {
      if (followerUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWINGS, payload: followerUser });
      }
    }
  };

  const addUserToFollowers = (followers: User[], followingUser: User) => {
    const exists = followers.some(
      (follower) => follower.id === followingUser.id,
    );

    console.log('followingUser', followingUser);

    if (!exists) {
      if (followingUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWINGS, payload: followingUser });
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

  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    const toFollowing = true;

    // follow follower user, add follower user to followings if not exist
    if (pageUser.id === loginUser.id) {
      addUserToFollowings(storage.followings, followerUser);
    }

    // follow page user, add login user to followers of page user
    if (pageUser.id === followerUser.id) {
      addUserToFollowers(storage.followers, followingUser);
    }

    // update IsFollowing flag
    updateFollowingsState(followerUser.id, toFollowing);
    updateIsFollowingInFollowers(followerUser, toFollowing);

    followAdapter.createFollowing(loginUser.id, followingUser.id);
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
    initIsLoaded,
    initData,
    addFollowerUserToFollowers,
    removeFollowerUserFromFollowers,
    addFollowingUserToFollowings,
    removeFollowingUserFromFollowings,
    countFollowings,
  };
};
