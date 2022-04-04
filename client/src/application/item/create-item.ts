import { User } from '../../domain';
import {
  useAuthStorage,
  useImageStorage,
  useItemAdapter,
} from '../../services';

export const useCreateItem = () => {
  const { updateLoginUser } = useAuthStorage();
  const imageStorage = useImageStorage();
  const itemAdapter = useItemAdapter();

  const createItem = async (
    imageFile: File,
    loginUser: User,
    title: string,
    author: string,
  ) => {
    try {
      // upload image
      const imageUrl = (await imageStorage.uploadImage(imageFile)) || '';
      if (!imageUrl) {
        return;
      }

      // update db
      const response = await itemAdapter.createItem(title, author, imageUrl);
      console.log(response);

      const newItem = response.data.data.createItem;
      await itemAdapter.addUserItem(loginUser.id, newItem.id);

      // update state
      updateLoginUser({
        ...loginUser,
        Items: loginUser.Items ? [...loginUser.Items, newItem] : [newItem],
      });
    } catch (err) {
      console.log('create-item submit');
      console.log(err);
    }
  };

  return {
    createItem,
  };
};
