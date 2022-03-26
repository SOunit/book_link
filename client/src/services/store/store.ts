import { combineReducers, createStore } from 'redux';
import { followReducer } from './re-ducks/follow/reducer';
import { searchReducer } from './re-ducks/search/reducer';

const rootReducer = combineReducers({
  follow: followReducer,
  search: searchReducer,
});

export function configureStore() {
  return createStore(rootReducer);
}

export type RootState = ReturnType<typeof rootReducer>;
