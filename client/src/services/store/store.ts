import { createStore } from 'redux';

// type
type FollowAction = {
  type: string;
};

type FollowState = {
  loginUser: {
    followings: any[];
    followers: any[];
  };
  targetUser: {
    followings: any[];
    followers: any[];
  };
};

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

const followReducer = (
  state = initialState,
  action: FollowAction,
): FollowState => {
  switch (action.type) {
    default: {
      console.log('follow state', state);
      return state;
    }
  }
};

export function configureStore() {
  return createStore(followReducer);
}

export type RootState = ReturnType<typeof followReducer>;
