import { followerServices, followingServices } from '../../services';

export const useFollow = () => {
  const unFollowUser = (loginUserId: string, unFollowingUserId: string) => {
    followingServices.deleteFollowing(loginUserId, unFollowingUserId);
    followerServices.deleteFollower(unFollowingUserId, loginUserId);
  };

  const followUser = (loginUserId: string, followingUserId: string) => {
    followingServices.createFollowing(loginUserId, followingUserId);
    followerServices.createFollower(followingUserId, loginUserId);
  };

  return {
    unFollowUser,
    followUser,
  };
};
