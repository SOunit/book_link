import { User } from '../../../../domain/';
import {
  ADD_USER_TO_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
} from './constants';
import { FollowActionTypes } from './types';

export const addUserToFollowersAction = (user: User): FollowActionTypes => {
  return { type: ADD_USER_TO_FOLLOWERS, payload: user };
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
