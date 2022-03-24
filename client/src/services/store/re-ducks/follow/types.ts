import { Action } from 'redux';
import { INIT_FOLLOWERS, INIT_FOLLOWINGS } from './constants';

export type FollowState = {
  followings: any[];
  followers: any[];
  isFollowingsLoaded: boolean;
  isFollowersLoaded: boolean;
};

interface InitFollowingsAction extends Action {
  type: typeof INIT_FOLLOWINGS;
  payload: any[];
}

interface InitFollowersAction extends Action {
  type: typeof INIT_FOLLOWERS;
  payload: any[];
}

export type FollowActionTypes = InitFollowingsAction | InitFollowersAction;
