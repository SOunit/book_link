import { useDispatch } from 'react-redux';
import { unRegisterItemAction } from '../../services/store/re-ducks/search/actions';

export const useUnRegisterItem = () => {
  const dispatch = useDispatch();

  const unRegisterItem = (itemId: string) => {
    dispatch(unRegisterItemAction(itemId));
  };

  return { unRegisterItem };
};
