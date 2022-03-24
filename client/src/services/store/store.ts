import { createStore } from 'redux';
import { followReducer } from './re-ducks/follow/reducer';

export function configureStore() {
  return createStore(followReducer);
}

export type RootState = ReturnType<typeof followReducer>;
