import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import Item from './../models/Item';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar/SearchBar';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import classes from './SearchUsers.module.css';
import SearchedUsers from '../components/searchedUsers/SearchedUsers';
import AuthContext from '../store/auth-context';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useSearchedItems from '../hooks/use-searched-items';
import userServices from '../services/userServices';
import useRegisteredItems from '../hooks/search-user/use-registered-items';
import useSearchedUsers from '../hooks/search-user/use-searched-users';

const SearchUsers = () => {
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();
  const {
    registeredItems,
    initItemsHandler,
    addRegisteredItemHandler,
    deleteRegisteredItemHandler,
  } = useRegisteredItems();
  const {
    searchedUsers,
    setSearchedUsers,
    followClickHandler,
    followingClickHandler,
  } = useSearchedUsers();
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  const { loginUser, token } = useContext(AuthContext);

  const itemSearchHandler = (searchedItems: Item[]) => {
    updateSearchedItemsHandler(searchedItems);
    setIsUserSearched(false);
  };

  const userSearchHandler = async () => {
    const itemIdList: string[] = [];
    registeredItems.map((item) => {
      return itemIdList.push(item.id);
    });

    userServices.fetchUsersByItems(itemIdList, token!).then((result) => {
      setSearchedUsers(result.data.data.getUsersByItems);
      setIsUserSearched(true);
    });
  };

  const setDefaultItems = useCallback(() => {
    if (!loginUser) {
      return;
    }

    let defaultItems = [];
    for (let i = 0; i < 3; i++) {
      if (loginUser.items[i]) {
        defaultItems.push(loginUser.items[i]);
      }
    }

    initItemsHandler(defaultItems);
  }, [loginUser, initItemsHandler]);

  useEffect(() => {
    setDefaultItems();
  }, [setDefaultItems, loginUser]);

  useEffect(() => {
    setIsUserSearched(false);
  }, [registeredItems]);

  let registeredItemsSection = null;
  if (registeredItems.length > 0) {
    registeredItemsSection = (
      <section>
        <SectionTitle>Registered items</SectionTitle>
        <RegisteredItems
          items={registeredItems}
          onDeleteRegisteredItem={deleteRegisteredItemHandler}
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
  if (searchedUsers && searchedUsers.length > 0 && loginUser) {
    searchedUsersSection = (
      <SearchedUsers
        users={searchedUsers}
        loginUser={loginUser}
        onFollowClick={followClickHandler}
        onFollowingClick={followingClickHandler}
      />
    );
  } else if (isUserSearched && searchedUsers && searchedUsers.length <= 0) {
    searchedUsersSection = (
      <p className={classes['text--user-not-found']}>No new user found!</p>
    );
  }

  return (
    <Fragment>
      <section className={classes['search-bar']}>
        <SearchBar
          placeholder={'Search item'}
          onSetIsSearched={updateIsItemSearchedHandler}
          onSetSearchResult={itemSearchHandler}
        />
      </section>
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={registeredItems}
          isItemSearched={isItemSearched}
          onAddClick={addRegisteredItemHandler}
        />
      </section>
      {registeredItemsSection}
      {searchedUsersSection}
    </Fragment>
  );
};

export default SearchUsers;
