import { useDispatch } from 'react-redux';
import { Item } from '../../domain';
import { registerItemAction } from '../../services/store/re-ducks/search/actions';

export const useRegisterItem = () => {
  const dispatch = useDispatch();

  const registerItem = (item: Item) => {
    dispatch(registerItemAction(item));
  };

  return { registerItem };
};
