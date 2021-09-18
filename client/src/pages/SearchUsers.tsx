import { Fragment, useContext, useState } from 'react';
import Item from './../models/Item';
import FollowingType from '../models/Following';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar/SearchBar';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import Button, { ButtonTypes } from '../components/ui/Buttons/Button';
import classes from './SearchUsers.module.css';
import SearchedUsers from '../components/seachedUsers/SearchedUsers';
import AuthContext from '../store/auth-context';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useSearchedItems from '../hooks/use-searched-items';
import services from '../services/services';

const SearchUsers = () => {
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();
  const [registeredItems, setRegisteredItems] = useState<Item[]>([]);
  const [searchedUsers, setSearchedUsers] = useState<FollowingType[]>([]);
  const [isUserSearched, setIsUserSearched] = useState<boolean>(false);
  const authCtx = useContext(AuthContext);

  const itemSearchHandler = (searchedItems: Item[]) => {
    updateSearchedItemsHandler(searchedItems);
    setIsUserSearched(false);
  };

  const deleteRegisteredItemHandler = (id: string) => {
    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState].filter(
        (elm) => elm.id !== id
      );
      return updatedRegisteredItems;
    });

    setIsUserSearched(false);
  };

  const addRegisteredItemHandler = (item: Item) => {
    setRegisteredItems((prevState) => {
      const updatedRegisteredItems = [...prevState];

      const match = updatedRegisteredItems.some((elem) => elem.id === item.id);
      if (match) {
        return prevState;
      }

      updatedRegisteredItems.push(item);
      return updatedRegisteredItems;
    });

    setIsUserSearched(false);
  };

  const userSearchHandler = async () => {
    const itemIdList: string[] = [];
    registeredItems.map((item) => {
      return itemIdList.push(item.id);
    });

    services.fetchUsersByItems(itemIdList, authCtx.token!).then((result) => {
      setSearchedUsers(result.data.data.getUsersByItems);
      setIsUserSearched(true);
    });
  };

  const followClickHandler = (targetUserId: string) => {
    // update state
    const newFollowings = searchedUsers.map((user) => {
      if (user.id === targetUserId) {
        user.isFollowing = true;
      }
      return user;
    });

    setSearchedUsers(newFollowings);
  };

  const followingClickHandler = (targetUserId: string) => {
    // update state
    const newFollowings = searchedUsers.map((user) => {
      if (user.id === targetUserId) {
        user.isFollowing = false;
      }
      return user;
    });
    setSearchedUsers(newFollowings);
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
  if (searchedUsers && searchedUsers.length > 0) {
    searchedUsersSection = (
      <SearchedUsers
        users={searchedUsers}
        loginUser={{
          id: authCtx.token!,
          name: 'dummy',
          about: 'dummy',
          imageUrl: 'dummy',
          items: [],
        }}
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
      <section className={classes['serach-bar']}>
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
