import { useCallback } from 'react';
import { useSearchStorage } from '../../services';

export const useClearSearchState = () => {
  const { clearSearchState: storageClearSearchState } = useSearchStorage();

  const clearSearchState = useCallback(() => {
    storageClearSearchState();
  }, [storageClearSearchState]);

  return { clearSearchState };
};
