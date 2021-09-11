import { FC, Fragment } from 'react';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useUser from '../hooks/use-user';

const EditUserItems: FC = () => {
  const user = useUser();

  const deleteItem = async () => {};

  const deleteClickHandler = (itemId: string) => {
    if (user.data) {
      // update user state
      const newUser = { ...user.data };
      newUser.items = newUser.items?.filter((item) => item.id !== itemId);
      user.setUser(newUser);

      // update db data
      deleteItem();
    }
  };

  let registeredItems;
  if (user.data) {
    registeredItems = (
      <RegisteredItems
        items={user.data.items}
        onDeleteRegistedItem={deleteClickHandler}
      />
    );
  }

  return (
    <Fragment>
      <SectionTitle>Your Items</SectionTitle>
      {registeredItems}
    </Fragment>
  );
};

export default EditUserItems;
