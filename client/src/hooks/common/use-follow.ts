import { useEffect, useState } from 'react';
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

  const followUserInFollowings = (targetUserId: string) => {
    if (followings && loginUserId) {
      // update state
      updateFollowingsState(followings, targetUserId, true);

      // update db
      followUser(loginUserId, targetUserId);
    }
  };

  const unFollowUserInFollowings = (targetUserId: string) => {
    if (followings && loginUserId) {
      // update state
      updateFollowingsState(followings, targetUserId, false);

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

    if (followers && followings && loginUserId) {
      // update state
      updateFollowersState(followers, targetUserId, isSelfUpdate, true);

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

    if (followers && loginUserId) {
      // update state
      updateFollowersState(followers, targetUserId, isSelfUpdate, false);

      // update db
      unFollowUser(loginUserId, isSelfUpdate ? pageUserId : targetUserId);
    }
  };

  useEffect(() => {
    const initFollow = async () => {
      if (targetUserId && loginUserId) {
        let res = await followServices.fetchFollowingUsers(
          targetUserId,
          loginUserId,
        );
        setFollowings(res.data.data.getFollowingUsers);

        res = await followServices.fetchFollowerUsers(
          targetUserId,
          loginUserId,
        );
        setFollowers(res.data.data.getFollowerUsers);
      }
    };

    initFollow();
  }, [targetUserId, loginUserId]);

  return {
    followings,
    setFollowings,
    followers,
    setFollowers,
    unFollowUser,
    followUser,
    followUserInFollowers,
    unFollowUserInFollowers,
    followUserInFollowings,
    unFollowUserInFollowings,
  };
};
