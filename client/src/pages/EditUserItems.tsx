import axios from 'axios';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useSearchedItems from '../hooks/use-searched-items';
import useUser from '../hooks/use-user';
import keys from '../util/keys';
import SearchBar from '../components/ui/SearchBar/SearchBar';
import classes from './EditUserItems.module.css';
import SearchedItems from '../components/searchedItems/SearchedItems';
import ItemType from '../models/Item';

const EditUserItems: FC = () => {
  const { user, setUser } = useUser();
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();

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

  const addClickHandler = (item: ItemType) => {
    console.log(item);
    if (user) {
      // update user state
      const newUser = { ...user };
      newUser.items.push(item);
      setUser(newUser);

      // update db
    }
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

  let searchedItemsSection;
  if (user) {
    searchedItemsSection = (
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={user.items}
          isItemSearched={isItemSearched}
          onAddClick={addClickHandler}
        />
      </section>
    );
  }

  return (
    <Fragment>
      <SectionTitle>Your items</SectionTitle>
      {registeredItems}
      <section className={classes['serach-bar']}>
        <SectionTitle>Add new items</SectionTitle>
        <SearchBar
          placeholder={'Search item'}
          onSetIsSearched={updateIsItemSearchedHandler}
          onSetSearchResult={updateSearchedItemsHandler}
        />
        <Link to='/' className={classes['new-item-link']}>
          {'Create New Item >'}
        </Link>
      </section>
      {searchedItemsSection}
    </Fragment>
  );
};

export default EditUserItems;
