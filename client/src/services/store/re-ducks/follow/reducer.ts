import { FollowState, FollowAction } from './types';

// reducer
const initialState: FollowState = {
  loginUser: {
    followings: ['loginUser', 'followings test'],
    followers: ['loginUser', 'followers test'],
  },
  targetUser: {
    followings: ['targetUser', 'followings test'],
    followers: ['targetUser', 'followers test'],
  },
};

export const followReducer = (
  state = initialState,
  action: FollowAction,
): FollowState => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
