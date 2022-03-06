import { useEffect, useState } from 'react';
import { User } from '../../models';
import { followerServices, followingServices } from '../../services';

export const useFollow = (targetUser?: User | null) => {
  const [followings, setFollowings] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  const unFollowUser = (loginUserId: string, unFollowingUserId: string) => {
    followingServices.deleteFollowing(loginUserId, unFollowingUserId);
    followerServices.deleteFollower(unFollowingUserId, loginUserId);
  };

  const followUser = (loginUserId: string, followingUserId: string) => {
    followingServices.createFollowing(loginUserId, followingUserId);
    followerServices.createFollower(followingUserId, loginUserId);
  };

  useEffect(() => {
    const initFollow = async () => {
      if (targetUser) {
        let res = await followingServices.fetchFollowingUsers(targetUser.id);
        setFollowings(res.data.data.getFollowingUsers);

        res = await followerServices.fetchFollowerUsers(targetUser.id);
        setFollowers(res.data.data.getFollowerUsers);
      }
    };

    initFollow();
  }, [targetUser]);

  return {
    followings,
    setFollowings,
    followers,
    setFollowers,
    unFollowUser,
    followUser,
  };
};
