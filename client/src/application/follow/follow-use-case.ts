import { useDispatch } from 'react-redux';
import { User } from '../../domain';
import { useFollowAdapter, useFollowStorage } from '../../services';
import {
  INIT_FOLLOWINGS,
  INIT_FOLLOWERS,
  ADD_USER_TO_FOLLOWINGS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
  UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
} from '../../services/store/re-ducks/follow/constants';
import { FollowAdapterService, FollowStorageService } from '../ports';

export const useFollowUseCase = () => {
  const followAdapter: FollowAdapterService = useFollowAdapter();
  const storage: FollowStorageService = useFollowStorage();
  const dispatch = useDispatch();

  const getData = () => {
    return storage;
  };

  const initData = (targetUserId: string, loginUserId: string) => {
    if (!storage.isFollowingsLoaded) {
      followAdapter
        .fetchFollowingUsers(targetUserId, loginUserId)
        .then((res) => {
          const followings = res.data.data.getFollowingUsers;
          dispatch({ type: INIT_FOLLOWINGS, payload: followings });
        });
    }

    if (!storage.isFollowersLoaded) {
      followAdapter
        .fetchFollowerUsers(targetUserId, loginUserId)
        .then((res) => {
          const followers = res.data.data.getFollowerUsers;
          dispatch({ type: INIT_FOLLOWERS, payload: followers });
        });
    }
  };

  const addUserToFollowings = (followings: User[], followerUser: User) => {
    const exists = followings.some(
      (following) => following.id === followerUser.id,
    );

    if (!exists) {
      if (followerUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWINGS, followerUser });
      }
    }
  };

  const addUserToFollowers = (followers: User[], followingUser: User) => {
    const exists = followers.some(
      (follower) => follower.id === followingUser.id,
    );

    if (!exists) {
      if (followingUser) {
        dispatch({ type: ADD_USER_TO_FOLLOWINGS, followingUser });
      }
    }
  };

  // FIXME
  // same with updateIsFollowingInFollowers?
  const updateFollowingsState = (
    targetUserId: string,
    isFollowingState: boolean,
  ) => {
    // setFollowings((prevState) => {
    //   return prevState!.map((user) => {
    //     if (user.id === targetUserId) {
    //       user.isFollowing = isFollowingState;
    //     }
    //     return user;
    //   });
    // });

    dispatch({
      type: UPDATE_IS_FOLLOWING_IN_FOLLOWINGS,
      payload: { targetUserId, isFollowingState },
    });
  };

  const updateIsFollowingInFollowers = (
    followingUser: User,
    toFollowing: boolean,
  ) => {
    // setFollowers((prevState) => {
    //   return prevState!.map((user) => {
    //     if (user.id === followingUser.id) {
    //       user.isFollowing = toFollowing;
    //     }
    //     return user;
    //   });
    // });

    dispatch({
      type: UPDATE_IS_FOLLOWING_IN_FOLLOWERS,
      payload: { followingUser, toFollowing },
    });
  };

  const addFollowerUserToFollowers = (
    followerUser: User,
    followingUser: User,
    pageUser: User,
    loginUser: User,
  ) => {
    const toFollowing = true;

    console.log('addFollowerUserToFollowers');
    console.log('followerUser', followerUser);
    console.log('followingUser', followingUser);
    console.log('pageUser', pageUser);
    console.log('loginUser', loginUser);

    // follow follower user, add follower user to followings if not exist
    if (pageUser.id === loginUser.id) {
      console.log('storage.followings', storage.followings);

      addUserToFollowings(storage.followings, followerUser);
    }

    // follow page user, add login user to followers of page user
    if (pageUser.id === followerUser.id) {
      addUserToFollowers(storage.followers, followingUser);
    }

    // update IsFollowing flag
    updateFollowingsState(followerUser.id, toFollowing);
    updateIsFollowingInFollowers(followerUser, toFollowing);

    followAdapter.createFollowing(loginUser.id, followingUser.id);
  };

  return {
    initData,
    getData,
    addFollowerUserToFollowers,
  };
};
