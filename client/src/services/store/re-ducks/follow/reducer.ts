import {
  ADD_USER_TO_FOLLOWERS,
  ADD_USER_TO_FOLLOWINGS,
  INIT_FOLLOWERS,
  INIT_FOLLOWINGS,
  INIT_FOLLOW_IS_LOADED,
  REMOVE_USER_FROM_FOLLOWERS,
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
    case INIT_FOLLOW_IS_LOADED: {
      return { ...state, isFollowersLoaded: false, isFollowingsLoaded: false };
    }

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
      console.log('newUser', newUser);

      return { ...state, followings: [...state.followings, newUser] };
    }

    case ADD_USER_TO_FOLLOWERS: {
      console.log(ADD_USER_TO_FOLLOWERS);
      const newUser = action.payload;
      return { ...state, followers: [...state.followers, newUser] };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWERS: {
      const { followerUser, toFollowing } = action.payload;
      console.log(UPDATE_IS_FOLLOWING_IN_FOLLOWERS);

      const newFollowers = state.followers.map((user) => {
        if (user.id === followerUser.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });

      return { ...state, followers: newFollowers };
    }

    case UPDATE_IS_FOLLOWING_IN_FOLLOWINGS: {
      const { followingUser, toFollowing } = action.payload;
      console.log(UPDATE_IS_FOLLOWING_IN_FOLLOWINGS);

      const newFollowings = state.followings.map((user) => {
        if (user.id === followingUser.id) {
          user.isFollowing = toFollowing;
        }
        return user;
      });

      return { ...state, followings: newFollowings };
    }

    case REMOVE_USER_FROM_FOLLOWERS: {
      console.log(REMOVE_USER_FROM_FOLLOWERS);
      const followingUserId = action.payload;

      const newFollowers = state.followers.filter(
        (follower) => follower.id !== followingUserId,
      );

      return { ...state, followers: newFollowers };
    }

    default: {
      return state;
    }
  }
};
