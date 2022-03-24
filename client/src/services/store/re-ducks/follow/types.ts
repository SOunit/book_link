// type
export type FollowAction = {
  type: string;
};

export type FollowState = {
  loginUser: {
    followings: any[];
    followers: any[];
  };
  targetUser: {
    followings: any[];
    followers: any[];
  };
};
