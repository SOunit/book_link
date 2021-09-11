import axios from 'axios';
import { FC, Fragment } from 'react';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useUser from '../hooks/use-user';
import keys from '../util/keys';

const EditUserItems: FC = () => {
  const { user, setUser } = useUser();

  const deleteDbItem = async (itemId: string) => {
    const graphqlQuery = {
      query: `
                mutation DeleteUserItem($userId: ID!, $itemId: ID!) {
                  deleteUserItem(data: {userId: $userId, itemId: $itemId}){
                    id
                  }
                }
              `,
      variables: {
        userId: user?.id,
        itemId,
      },
    };

    axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });
  };

  const deleteClickHandler = (itemId: string) => {
    if (user) {
      // update user state
      const newUser = { ...user };
      newUser.items = newUser.items?.filter((item) => item.id !== itemId);
      setUser(newUser);

      // update db data
      deleteDbItem(itemId);
    }
  };

  let registeredItems;
  if (user) {
    registeredItems = (
      <RegisteredItems
        items={user.items}
        onDeleteRegistedItem={deleteClickHandler}
      />
    );
  }

  return (
    <Fragment>
      <SectionTitle>Your items</SectionTitle>
      {registeredItems}
      <SectionTitle>Add new items</SectionTitle>
    </Fragment>
  );
};

export default EditUserItems;
