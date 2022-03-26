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
import { useRegisteredItems, useSearchedUsers } from '../../hooks';
import { Item } from '../../../domain/';
import { useItemAdapter, useSearchStorage } from '../../../services';
// FIXME: de-couple from context
import { AuthContext } from '../../../services/store';
import {
  useRegisterItem,
  useSearchItems,
  useSearchUsers,
  useUnRegisterItem,
} from '../../../application';
import classes from './search-users.module.scss';
import { useUpdateIsItemSearched } from '../../../application/search-users/update-is-item-searched';

export const SearchUsers = () => {
  const { initItemsHandler } = useRegisteredItems();
  const { followClickHandler, followingClickHandler } = useSearchedUsers();

  // clean architecture
  const { isItemSearched, searchedItems, registeredItems, searchedUsers } =
    useSearchStorage();
  const { searchItems } = useSearchItems();
  const { registerItem } = useRegisterItem();
  const { unRegisterItem } = useUnRegisterItem();
  const { searchUsers } = useSearchUsers();
  const { updateIsItemSearched } = useUpdateIsItemSearched();
  // FIXME: to application use-case
  const { fetchRandomItems } = useItemAdapter();

  const [searchItemInput, setSearchItemInput] = useState<string>('');
  const searchItemInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateIsItemSearched(false);
    setSearchItemInput(e.target.value);
  };
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  const { loginUser, token } = useContext(AuthContext);

  const itemSearchHandler = (searchedItems: Item[]) => {
    // FIXME: to state?
    setIsUserSearched(false);
    searchItems(searchItemInput);
  };

  const registerItemHandler = (item: Item) => {
    registerItem(item);
  };

  const unRegisterItemHandler = (itemId: string) => {
    unRegisterItem(itemId);
  };

  const userSearchHandler = async () => {
    // FIXME: to state?
    setIsUserSearched(true);
    searchUsers(token!);
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
          onDeleteRegisteredItem={unRegisterItemHandler}
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
          onSetIsSearched={() => updateIsItemSearched(true)}
          onSetSearchResult={itemSearchHandler}
        />
      </section>
      <section>
        <SearchedItems
          items={searchedItems}
          registeredItems={registeredItems}
          isItemSearched={isItemSearched}
          onAddClick={registerItemHandler}
        />
      </section>
      {registeredItemsSection}
      {searchedUsersSection}
    </Fragment>
  );
};
