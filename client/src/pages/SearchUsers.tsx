import { Fragment, useContext, useState } from 'react';
import axios from 'axios';
import Item from './../models/Item';
import User from './../models/User';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import classes from './SearchUsers.module.css';
import SearchedUsers from '../components/seachedUsers/SearchedUsers';
import AuthContext from '../store/auth-context';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';

const SearchUsers = () => {
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [isItemSearched, setIsItemSearched] = useState(false);
  const [registeredItems, setRegisteredItems] = useState<Item[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const authCtx = useContext(AuthContext);

  const updateSearchedItemsHandler = (searchedItems: Item[]) => {
    setSearchedItems(searchedItems);
  };

  const updateIsItemSearchedHandler = () => {
    setIsItemSearched(true);
  };

  const deleteRegisteredItemHandler = (id: string) => {
    console.log('delete registered item');
    console.log('item id', id);

    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState].filter(
        (elm) => elm.id !== id
      );
      return updatedRegisteredItems;
    });
  };

  const addRegisteredItemHandler = (item: Item) => {
    console.log('add registered item');

    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState];

      const match = updatedRegisteredItems.some((elem) => elem.id === item.id);
      if (match) {
        console.log('Item already exists');
        return prevState;
      }

      updatedRegisteredItems.push(item);
      return updatedRegisteredItems;
    });
  };

  const userSearchHandler = async () => {
    const itemIdList: string[] = [];
    registeredItems.map((item) => {
      return itemIdList.push(item.id);
    });

    const graphqlQuery = {
      query: `
              query fetchUsersByItems($itemIds: [String!]!, $userId: String!){
                getUsersByItems(itemIds: $itemIds, userId: $userId){
                  id
                  name
                  about
                  imageUrl
                }
              }
            `,
      variables: {
        itemIds: itemIdList,
        userId: authCtx.token,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });
    console.log(result.data.data.getUsersByItems);

    console.log('user search!');

    setSearchedUsers(result.data.data.getUsersByItems);
  };

  let registeredItemsSection = null;
  if (registeredItems.length > 0) {
    registeredItemsSection = (
      <section>
        <SectionTitle>Registered items</SectionTitle>
        <RegisteredItems
          items={registeredItems}
          onDeleteRegistedItem={deleteRegisteredItemHandler}
        />
        <div className={classes['button-container']}>
          <Button
            buttonText={'Search users'}
            buttonType={ButtonTypes.NORMAL}
            onButtonClick={userSearchHandler}
          />
        </div>
      </section>
    );
  }

  let searchedUsersSection = null;
  if (searchedUsers.length > 0) {
    searchedUsersSection = <SearchedUsers users={searchedUsers} />;
  }

  return (
    <Fragment>
      <section className={classes['serach-bar']}>
        <SearchBar
          placeholder={'Search item'}
          onUpdateIsItemSearched={updateIsItemSearchedHandler}
          onUpdateSearchedItems={updateSearchedItemsHandler}
        />
      </section>
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={registeredItems}
          isItemSearched={isItemSearched}
          onAddRegisteredItem={addRegisteredItemHandler}
        />
      </section>
      {registeredItemsSection}
      {searchedUsersSection}
    </Fragment>
  );
};

export default SearchUsers;
