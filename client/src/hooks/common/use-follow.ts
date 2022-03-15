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

  const followClickHandler = (
    targetUserId: string,
    loginUserId: string,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUserId === targetUserId;

    if (followers && loginUserId) {
      // update state
      const newFollowers = followers.map((user) => {
        if (isSelfUpdate ? user.id === loginUserId : user.id === targetUserId) {
          user.isFollowing = true;
        }
        return user;
      });
      setFollowers(newFollowers);

      // update db
      followUser(loginUserId, isSelfUpdate ? pageUserId : targetUserId);
    }
  };

  const followingClickHandler = (
    targetUserId: string,
    loginUserId: string,
    pageUserId: string,
  ) => {
    const isSelfUpdate = loginUserId === targetUserId;

    if (followers && loginUserId) {
      // update state
      const newFollowers = followers.map((user) => {
        if (isSelfUpdate ? user.id === loginUserId : user.id === targetUserId) {
          user.isFollowing = false;
        }
        return user;
      });
      setFollowers(newFollowers);

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
    followClickHandler,
    followingClickHandler,
  };
};
