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
    console.log('updateFollowerState');
    console.log('followingUser', followingUser);
    console.log('followers', followers);
    console.log('toFollowing', toFollowing);

    const exist = followers.some(
      (follower) => follower.id === followingUser.id,
    );
    console.log('exist', exist);

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

    console.log('newFollowers', newFollowers);

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
    console.log('followUserInfoFollowings');

    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followings, followingUser.id, true);
      updateFollowersState(followers, followingUser, true);

      // update db
      followUser(loginUserId, followingUser.id);
    }
  };

  const removeFollowingUserFromFollowings = (followingUser: User) => {
    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followings, followingUser.id, false);
      updateFollowersState(followers, followingUser, false);

      // update db
      unFollowUser(loginUserId, followingUser.id);
    }
  };

  const followUserInFollowers = (
    targetUser: User,
    loginUser: User,
    pageUserId: string,
  ) => {
    const toFollowing = true;

    if (followers && followings && loginUser.id) {
      // update state
      addFollowerUserToFollowingsState(followers, followings, targetUser.id);
      updateFollowingsState(followings, targetUser.id, toFollowing);
      updateFollowersState(followers, targetUser, toFollowing);

      // update db
      followUser(loginUser.id, targetUser.id);
    }
  };

  const unFollowUserInFollowers = (
    targetUser: User,
    loginUser: User,
    pageUserId: string,
  ) => {
    const toFollowing = false;

    if (followers && followings && loginUser.id) {
      // update state
      updateFollowingsState(followings, targetUser.id, toFollowing);
      updateFollowersState(followers, targetUser, toFollowing);

      // update db
      unFollowUser(loginUser.id, targetUser.id);
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
    addFollowingUserToFollowings,
    removeFollowingUserFromFollowings,
  };
};
