import { followerServices, followingServices } from '../../services';

export const useFollow = () => {
  const deleteFollowing = (loginUserId: string, followingUserId: string) => {
    followingServices.deleteFollowing(loginUserId, followingUserId);
    followerServices.deleteFollower(loginUserId, followingUserId);
  };

  const createFollowing = (loginUserId: string, followingUserId: string) => {
    followingServices.createFollowing(loginUserId, followingUserId);
    followerServices.createFollower(loginUserId, followingUserId);
  };

  return {
    deleteFollowing,
    createFollowing,
  };
};
