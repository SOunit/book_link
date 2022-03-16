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
    followingUser: User,
    toFollowing: boolean,
  ) => {
    const exist = followers.some(
      (follower) => follower.id === followingUser.id,
    );

    let newFollowers;
    if (!exist) {
      newFollowers = [...followers, followingUser];
    }

    newFollowers = followers.map((user) => {
      if (user.id === followingUser.id) {
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

  const addFollowingUserToFollowings = (followingUser: User) => {
    const toFollowing = true;

    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followings, followingUser.id, toFollowing);
      updateFollowersState(followers, followingUser, toFollowing);

      // update db
      followUser(loginUserId, followingUser.id);
    }
  };

  const removeFollowingUserFromFollowings = (followingUser: User) => {
    const toFollowing = false;

    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followings, followingUser.id, toFollowing);
      updateFollowersState(followers, followingUser, toFollowing);

      // update db
      unFollowUser(loginUserId, followingUser.id);
    }
  };

  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
  ) => {
    const toFollowing = true;

    if (followers && followings && followingUser.id) {
      // update state
      addFollowerUserToFollowingsState(followers, followings, followerUser.id);
      updateFollowingsState(followings, followerUser.id, toFollowing);
      updateFollowersState(followers, followerUser, toFollowing);

      // update db
      followUser(followingUser.id, followerUser.id);
    }
  };

  const removeFollowerUserFromFollowers = (
    followerUser: User,
    followingUser: User,
  ) => {
    const toFollowing = false;

    if (followers && followings && followingUser.id) {
      // update state
      updateFollowingsState(followings, followerUser.id, toFollowing);
      updateFollowersState(followers, followerUser, toFollowing);

      // update db
      unFollowUser(followingUser.id, followerUser.id);
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
    addFollowerUserToFollowers,
    removeFollowerUserFromFollowers,
    addFollowingUserToFollowings,
    removeFollowingUserFromFollowings,
  };
};
