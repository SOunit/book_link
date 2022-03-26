import { ChangeEvent, Fragment, useContext, useEffect, useState } from 'react';
import { Button } from '../../components/atoms';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SearchedUsers,
  SectionTitle,
} from '../../components/molecules';
import { Item, User } from '../../../domain/';
import { useSearchStorage } from '../../../services';
import {
  useFollowUser,
  useRegisterItem,
  useSearchItems,
  useSearchUsers,
  useSetDefaultItems,
  useUnFollowUser,
  useUnRegisterItem,
  useUpdateIsItemSearched,
} from '../../../application';
// FIXME: de-couple from context
import { AuthContext } from '../../../services/store';
import classes from './search-users.module.scss';

export const SearchUsers = () => {
  // clean architecture
  const { isItemSearched, searchedItems, registeredItems, searchedUsers } =
    useSearchStorage();
  const { searchItems } = useSearchItems();
  const { registerItem } = useRegisterItem();
  const { unRegisterItem } = useUnRegisterItem();
  const { searchUsers } = useSearchUsers();
  const { updateIsItemSearched } = useUpdateIsItemSearched();
  const { setDefaultItems } = useSetDefaultItems();
  const { followUser } = useFollowUser();
  const { unFollowUser } = useUnFollowUser();

  const [searchItemInput, setSearchItemInput] = useState<string>('');
  // FIXME: to redux state
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  // FIXME: to clean architecture
  const { loginUser, token } = useContext(AuthContext);

  const searchItemInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateIsItemSearched(false);
    setSearchItemInput(e.target.value);
  };

  const itemSearchHandler = () => {
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

  const followClickHandler = (followerUser: User) => {
    if (loginUser) {
      followUser(loginUser, followerUser);
    }
  };

  const followingClickHandler = (followerUser: User) => {
    if (loginUser) {
      unFollowUser(loginUser, followerUser);
    }
  };

  useEffect(() => {
    setDefaultItems();
  }, [setDefaultItems]);

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
