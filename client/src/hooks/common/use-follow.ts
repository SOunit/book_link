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
    targetUserId: string,
    isFollowingState: boolean,
  ) => {
    setFollowings((prevState) => {
      return prevState!.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = isFollowingState;
        }
        return user;
      });
    });
  };

  const updateIsFollowingInFollowers = (
    followingUser: User,
    toFollowing: boolean,
  ) => {
    setFollowers((prevState) => {
      return prevState!.map((user) => {
        if (user.id === followingUser.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });
    });
  };

  const addUserToFollowings = (followings: User[], followerUser: User) => {
    const exists = followings.some(
      (following) => following.id === followerUser.id,
    );

    if (!exists) {
      if (followerUser) {
        setFollowings((prevState) => [...prevState!, followerUser]);
      }
    }
  };

  const addUserToFollowers = (
    followers: User[],
    followingUser: User,
    pageUser: User,
  ) => {
    const exists = followers.some(
      (follower) => follower.id === followingUser.id,
    );

    if (!exists) {
      if (followingUser) {
        setFollowers((prevState) => [...prevState!, followingUser]);
      }
    }
  };

  const removeUserFromFollowers = (followingUser: User) => {
    setFollowers((prevState) => {
      return prevState!.filter((follower) => follower.id !== followingUser.id);
    });
  };

  const addFollowingUserToFollowings = (followingUser: User) => {
    const toFollowing = true;

    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followingUser.id, toFollowing);
      updateIsFollowingInFollowers(followingUser, toFollowing);

      // update db
      followUser(loginUserId, followingUser.id);
    }
  };

  const removeFollowingUserFromFollowings = (followingUser: User) => {
    const toFollowing = false;

    if (followings && followers && loginUserId) {
      // update state
      updateFollowingsState(followingUser.id, toFollowing);
      updateIsFollowingInFollowers(followingUser, toFollowing);

      // update db
      unFollowUser(loginUserId, followingUser.id);
    }
  };

  // FIXME: rename logic
  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    const toFollowing = true;

    if (followers && followings && followingUser.id) {
      // follow follower user, add follower user to followings if not exist
      if (pageUser.id === loginUser.id) {
        addUserToFollowings(followings, followerUser);
      }

      // follow page user, add login user to followers of page user
      if (pageUser.id === followerUser.id) {
        addUserToFollowers(followers, followingUser, pageUser);
      }

      // update IsFollowing flag
      updateFollowingsState(followerUser.id, toFollowing);
      updateIsFollowingInFollowers(followerUser, toFollowing);

      // update db
      followUser(followingUser.id, followerUser.id);
    }
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
