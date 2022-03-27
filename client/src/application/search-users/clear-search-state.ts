import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearchStateAction } from '../../services/store/re-ducks/search/actions';

export const useClearSearchState = () => {
  const dispatch = useDispatch();

  const clearSearchState = useCallback(() => {
    dispatch(clearSearchStateAction());
  }, [dispatch]);

  return { clearSearchState };
};
