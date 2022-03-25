import { User } from '../../../../domain/';
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
import { FollowActionTypes } from './types';

export const initFollowIsLoadedAction = (): FollowActionTypes => {
  return { type: INIT_FOLLOW_IS_LOADED };
};

export const initFollowingsAction = (followings: User[]): FollowActionTypes => {
  return { type: INIT_FOLLOWINGS, payload: followings };
};

export const initFollowersAction = (followers: User[]): FollowActionTypes => {
  return { type: INIT_FOLLOWERS, payload: followers };
};

export const addUserToFollowersAction = (user: User): FollowActionTypes => {
  return { type: ADD_USER_TO_FOLLOWERS, payload: user };
};

export const addUserToFollowingsAction = (
  followingUser: User,
): FollowActionTypes => {
  return { type: ADD_USER_TO_FOLLOWINGS, payload: followingUser };
};

export const UpdateIsFollowingInFollowersAction = (
  followerUser: User,
  toFollowing: boolean,
): FollowActionTypes => {
  return {
    type: UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
    payload: { followerUser, toFollowing },
  };
};

export const updateIsFollowingInFollowingsAction = (
  followingUser: User,
  toFollowing: boolean,
): FollowActionTypes => {
  return {
    type: UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
    payload: {
      followingUser,
      toFollowing,
    },
  };
};

export const removeUserFromFollowersAction = (
  followingUser: User,
): FollowActionTypes => {
  return { type: REMOVE_USER_FROM_FOLLOWERS, payload: followingUser.id };
};
