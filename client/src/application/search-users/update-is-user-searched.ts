import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateIsUserSearchedAction } from '../../services/store/re-ducks/search/actions';

export const useUpdateIsUserSearched = () => {
  const dispatch = useDispatch();

  const updateIsUserSearched = useCallback(
    (isUserSearched: boolean) => {
      dispatch(updateIsUserSearchedAction(isUserSearched));
    },
    [dispatch],
  );

  return { updateIsUserSearched };
};
