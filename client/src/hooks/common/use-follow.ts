import { followerServices, followingServices } from '../../services';

export const useFollow = () => {
  const unFollowUser = (loginUserId: string, followingUserId: string) => {
    followingServices.deleteFollowing(loginUserId, followingUserId);
    followerServices.deleteFollower(loginUserId, followingUserId);
  };

  const followUser = (loginUserId: string, followingUserId: string) => {
    followingServices.createFollowing(loginUserId, followingUserId);
    followerServices.createFollower(loginUserId, followingUserId);
  };

  return {
    unFollowUser,
    followUser,
  };
};
