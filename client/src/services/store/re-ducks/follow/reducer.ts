import { INIT_FOLLOWERS, INIT_FOLLOWINGS } from './constants';
import { FollowState, FollowAction } from './types';

// reducer
const initialState: FollowState = {
  followings: ['loginUser', 'followings test'],
  followers: ['loginUser', 'followers test'],
  isFollowersLoaded: false,
  isFollowingsLoaded: false,
};

export const followReducer = (
  state = initialState,
  action: FollowAction,
): FollowState => {
  switch (action.type) {
    case INIT_FOLLOWERS: {
      console.log(INIT_FOLLOWERS);

      return { ...state, isFollowersLoaded: true };
    }

    case INIT_FOLLOWINGS: {
      console.log(INIT_FOLLOWINGS);
      return { ...state, isFollowingsLoaded: true };
    }

    default: {
      return state;
    }
  }
};
