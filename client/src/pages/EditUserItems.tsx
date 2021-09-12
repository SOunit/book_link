import axios from 'axios';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useSearchedItems from '../hooks/use-searched-items';
import useLoginUser from '../hooks/use-login-user';
import keys from '../util/keys';
import SearchBar from '../components/ui/SearchBar/SearchBar';
import classes from './EditUserItems.module.css';
import SearchedItems from '../components/searchedItems/SearchedItems';
import ItemType from '../models/Item';

const EditUserItems: FC = () => {
  const { loginUser, setLoginUser } = useLoginUser();
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
        userId: loginUser?.id,
        itemId,
      },
    };

    axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });
  };

  const addDbItem = async (itemId: string) => {
    const graphqlQuery = {
      query: `
              mutation AddUserItem($userId: ID!, $itemId: ID!){
                addUserItem(data: {userId: $userId, itemId: $itemId}){
                  id
                }
              }
              `,
      variables: {
        userId: loginUser?.id,
        itemId,
      },
    };

    await axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'POST',
      data: graphqlQuery,
    });
  };

  const addClickHandler = (item: ItemType) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      newUser.items.push(item);
      setLoginUser(newUser);

      // update db
      addDbItem(item.id);
    }
  };

  const deleteClickHandler = (itemId: string) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      newUser.items = newUser.items?.filter((item) => item.id !== itemId);
      setLoginUser(newUser);

      // update db data
      deleteDbItem(itemId);
    }
  };

  let registeredItems;
  if (loginUser) {
    registeredItems = (
      <RegisteredItems
        items={loginUser.items}
        onDeleteRegistedItem={deleteClickHandler}
      />
    );
  }

  let searchedItemsSection;
  if (loginUser) {
    searchedItemsSection = (
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={loginUser.items}
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
