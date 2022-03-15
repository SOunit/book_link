import { useCallback, useEffect, useState } from 'react';
import { User } from '../../models';
import { followServices } from '../../services';

export const useFollow = (targetUserId?: string, loginUserId?: string) => {
  const [followings, setFollowings] = useState<User[]>();
  const [followers, setFollowers] = useState<User[]>();

  const unFollowUser = (followingUserId: string, followerUserId: string) => {
    followServices.deleteFollowing(followingUserId, followerUserId);
  };

  const followUser = (followingUserId: string, followerUserId: string) => {
    followServices.createFollowing(followingUserId, followerUserId);
  };

  const updateFollowingsState = (
    followings: User[],
    targetUserId: string,
    isFollowingState: boolean,
  ) => {
    const newFollowings = followings.map((user) => {
      if (user.id === targetUserId) {
        user.isFollowing = isFollowingState;
      }
      return user;
    });
    setFollowings(newFollowings);
  };

  const updateFollowersState = (
    followers: User[],
    targetUserId: string,
    isSelfUpdate: boolean,
    toFollowing: boolean,
  ) => {
    const newFollowers = followers.map((user) => {
      if (isSelfUpdate ? user.id === loginUserId : user.id === targetUserId) {
        user.isFollowing = toFollowing;
      }
      return user;
    });
    setFollowers(newFollowers);
  };

  const addFollowerUserToFollowingsState = (
    followers: User[],
    followings: User[],
    targetUserId: string,
  ) => {
    const exists = followings.some(
      (followings) => followings.id === targetUserId,
    );

    if (!exists) {
      const targetUserData = followers.find(
        (follower) => follower.id === targetUserId,
      );
      if (targetUserData) {
        followings.push(targetUserData);
      }
    }
  };

  const followUserInFollowings = (targetUserId: string) => {
    if (followings && followers && loginUserId) {
      const isSelfUpdate = loginUserId === targetUserId;

      // update state
      updateFollowingsState(followings, targetUserId, true);
      updateFollowersState(followers, targetUserId, isSelfUpdate, true);

      // update db
      followUser(loginUserId, targetUserId);
    }
  };

  const unFollowUserInFollowings = (targetUserId: string) => {
    if (followings && followers && loginUserId) {
      const isSelfUpdate = loginUserId === targetUserId;

      // update state
      updateFollowingsState(followings, targetUserId, false);
      updateFollowersState(followers, targetUserId, isSelfUpdate, false);

      // update db
      unFollowUser(loginUserId, targetUserId);
    }
  };

  const followUserInFollowers = (
    targetUserId: string,
    loginUserId: string,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUserId === targetUserId;
    const toFollowing = true;

    if (followers && followings && loginUserId) {
      // update state
      addFollowerUserToFollowingsState(followers, followings, targetUserId);
      updateFollowingsState(followings, targetUserId, toFollowing);
      updateFollowersState(followers, targetUserId, isSelfUpdate, toFollowing);

      // update db
      followUser(loginUserId, isSelfUpdate ? pageUserId : targetUserId);
    }
  };

  const unFollowUserInFollowers = (
    targetUserId: string,
    loginUserId: string,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUserId === targetUserId;
    const toFollowing = false;

    if (followers && followings && loginUserId) {
      // update state
      updateFollowingsState(followings, targetUserId, toFollowing);
      updateFollowersState(followers, targetUserId, isSelfUpdate, toFollowing);

      // update db
      unFollowUser(loginUserId, isSelfUpdate ? pageUserId : targetUserId);
    }
  };

  const initFollow = useCallback(async () => {
    if (targetUserId && loginUserId) {
      let res = await followServices.fetchFollowingUsers(
        targetUserId,
        loginUserId,
      );
      setFollowings(res.data.data.getFollowingUsers);

      res = await followServices.fetchFollowerUsers(targetUserId, loginUserId);
      setFollowers(res.data.data.getFollowerUsers);
    }
  }, [loginUserId, targetUserId]);

  useEffect(() => {
    initFollow();
  }, [initFollow]);

  return {
    followings,
    followers,
    setFollowings,
    setFollowers,
    followUser,
    unFollowUser,
    followUserInFollowers,
    unFollowUserInFollowers,
    followUserInFollowings,
    unFollowUserInFollowings,
  };
};
