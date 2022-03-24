// type
export type FollowAction = {
  type: string;
};

export type FollowState = {
  followings: any[];
  followers: any[];
  isFollowingsLoaded: boolean;
  isFollowersLoaded: boolean;
};
