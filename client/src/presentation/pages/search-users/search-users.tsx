import {
  ChangeEvent,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button } from '../../components/atoms';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SearchedUsers,
  SectionTitle,
} from '../../components/molecules';
import {
  useRegisteredItems,
  useSearchedItems,
  useSearchedUsers,
} from '../../hooks';
import { Item } from '../../../domain/';
import { useItemAdapter, useUserAdapter } from '../../../services';
import { AuthContext } from '../../../services/store';

import classes from './search-users.module.scss';
import { useSearchItems } from '../../../application';

export const SearchUsers = () => {
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
  const { fetchRandomItems } = useItemAdapter();
  const { fetchUsersByItems } = useUserAdapter();
  const { searchItems } = useSearchItems();

  searchItems('test');

  const [searchItemInput, setSearchItemInput] = useState<string>('');
  const searchItemInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateIsItemSearchedHandler(false);
    setSearchItemInput(e.target.value);
  };

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

    fetchUsersByItems(itemIdList, token!).then((result) => {
      setSearchedUsers(result.data.data.getUsersByItems);
      setIsUserSearched(true);
    });
  };

  const setDefaultItems = useCallback(() => {
    if (!loginUser || !loginUser.items) {
      return;
    }

    let defaultItems = [];
    for (let i = 0; i < 3; i++) {
      if (loginUser.items[i]) {
        defaultItems.push(loginUser.items[i]);
      }
    }

    if (defaultItems.length === 0) {
      fetchRandomItems().then((response) => {
        defaultItems = response.data.data.fetchRandomItems;
        initItemsHandler(defaultItems);
      });
    } else {
      initItemsHandler(defaultItems);
    }
  }, [loginUser, initItemsHandler, fetchRandomItems]);

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
          <Button title="Search Users" onClick={userSearchHandler} />
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
      <NotFoundMessage
        title="No user found!"
        text="Please change items to search user."
      />
    );
  }

  return (
    <Fragment>
      <section className={classes['search-bar']}>
        <SearchBar
          value={searchItemInput}
          onChange={searchItemInputChangeHandler}
          placeholder={'Search item'}
          onSetIsSearched={updateIsItemSearchedHandler}
          onSetSearchResult={itemSearchHandler}
        />
      </section>
      <section>
        <SearchedItems
          searchItemInput={searchItemInput}
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
