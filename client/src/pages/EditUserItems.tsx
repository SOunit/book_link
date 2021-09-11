import { FC, Fragment } from 'react';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useUser from '../hooks/use-user';

const EditUserItems: FC = () => {
  const user = useUser();

  let registeredItems;
  if (user) {
    registeredItems = (
      <RegisteredItems items={user.items} onDeleteRegistedItem={() => {}} />
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
