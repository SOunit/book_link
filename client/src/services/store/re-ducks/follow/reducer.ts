import {
  ADD_USER_TO_FOLLOWERS,
  ADD_USER_TO_FOLLOWINGS,
  INIT_FOLLOWERS,
  INIT_FOLLOWINGS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
} from './constants';
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

    case ADD_USER_TO_FOLLOWINGS: {
      console.log(ADD_USER_TO_FOLLOWINGS);
      const newUser = action.payload;
      return { ...state, followings: [...state.followings, newUser] };
    }

    case ADD_USER_TO_FOLLOWERS: {
      console.log(ADD_USER_TO_FOLLOWERS);
      const newUser = action.payload;
      return { ...state, followers: [...state.followers, newUser] };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWERS: {
      const { followingUser, toFollowing } = action.payload;
      console.log(UPDATE_IS_FOLLOWING_IN_FOLLOWERS);

      const newFollowers = state.followers.map((user) => {
        if (user.id === followingUser.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });

      return { ...state, followers: newFollowers };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWINGS: {
      // FIXME
      const { targetUserId, isFollowingState } = action.payload;
      console.log(UPDATE_IS_FOLLOWING_IN_FOLLOWINGS);

      const newFollowings = state.followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = isFollowingState;
        }
        return user;
      });

      return { ...state, followings: newFollowings };
    }

    default: {
      return state;
    }
  }
};
