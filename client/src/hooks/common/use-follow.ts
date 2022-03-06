import { useEffect, useState } from 'react';
import { User } from '../../models';
import { followServices } from '../../services';

export const useFollow = (targetUser?: User | null) => {
  const [followings, setFollowings] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);

  const unFollowUser = (loginUserId: string, unFollowingUserId: string) => {
    followServices.deleteFollowing(loginUserId, unFollowingUserId);
  };

  const followUser = (loginUserId: string, followingUserId: string) => {
    followServices.createFollowing(loginUserId, followingUserId);
  };

  useEffect(() => {
    const initFollow = async () => {
      if (targetUser) {
        let res = await followServices.fetchFollowingUsers(targetUser.id);
        setFollowings(res.data.data.getFollowingUsers);

        res = await followServices.fetchFollowerUsers(targetUser.id);
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
