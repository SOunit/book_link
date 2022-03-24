import { INIT_FOLLOWERS, INIT_FOLLOWINGS } from './constants';
import { FollowState, FollowActionTypes } from './types';

// reducer
const initialState: FollowState = {
  followings: [],
  followers: [],
  isFollowersLoaded: false,
  isFollowingsLoaded: false,
};

export const followReducer = (
  state = initialState,
  action: FollowActionTypes,
): FollowState => {
  switch (action.type) {
    case INIT_FOLLOWERS: {
      console.log(INIT_FOLLOWERS);

      return { ...state, followers: action.payload, isFollowersLoaded: true };
    }

    case INIT_FOLLOWINGS: {
      console.log(INIT_FOLLOWINGS);
      return { ...state, followings: action.payload, isFollowingsLoaded: true };
    }

    default: {
      return state;
    }
  }
};
