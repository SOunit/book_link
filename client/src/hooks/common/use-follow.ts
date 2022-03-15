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
    targetUser: User,
    isSelfUpdate: boolean,
    toFollowing: boolean,
  ) => {
    const newFollowers = followers.map((user) => {
      if (isSelfUpdate ? user.id === loginUserId : user.id === targetUser.id) {
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

  const followUserInFollowings = (targetUser: User) => {
    console.log('followUserInfoFollowings');

    if (followings && followers && loginUserId) {
      const isSelfUpdate = loginUserId === targetUserId;

      // update state
      updateFollowingsState(followings, targetUser.id, true);
      updateFollowersState(followers, targetUser, isSelfUpdate, true);

      // update db
      followUser(loginUserId, targetUser.id);
    }
  };

  const unFollowUserInFollowings = (targetUser: User) => {
    if (followings && followers && loginUserId) {
      const isSelfUpdate = loginUserId === targetUserId;

      // update state
      updateFollowingsState(followings, targetUser.id, false);
      updateFollowersState(followers, targetUser, isSelfUpdate, false);

      // update db
      unFollowUser(loginUserId, targetUser.id);
    }
  };

  const followUserInFollowers = (
    targetUser: User,
    loginUser: User,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUser.id === targetUser.id;
    const toFollowing = true;

    if (followers && followings && loginUser.id) {
      // update state
      addFollowerUserToFollowingsState(followers, followings, targetUser.id);
      updateFollowingsState(followings, targetUser.id, toFollowing);
      updateFollowersState(followers, targetUser, isSelfUpdate, toFollowing);

      // update db
      followUser(loginUser.id, isSelfUpdate ? pageUserId : targetUser.id);
    }
  };

  const unFollowUserInFollowers = (
    targetUser: User,
    loginUser: User,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUser.id === targetUserId;
    const toFollowing = false;

    if (followers && followings && loginUser.id) {
      // update state
      updateFollowingsState(followings, targetUser.id, toFollowing);
      updateFollowersState(followers, targetUser, isSelfUpdate, toFollowing);

      // update db
      unFollowUser(loginUser.id, isSelfUpdate ? pageUserId : targetUser.id);
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
