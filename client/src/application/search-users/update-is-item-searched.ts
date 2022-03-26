import { useDispatch } from 'react-redux';
import { updateIsItemSearchedAction } from '../../services/store/re-ducks/search/actions';

export const useUpdateIsItemSearched = () => {
  const dispatch = useDispatch();

  const updateIsItemSearched = (isItemSearched: boolean) => {
    dispatch(updateIsItemSearchedAction(isItemSearched));
  };

  return { updateIsItemSearched };
};
