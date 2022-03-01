import { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item as ItemType } from '../../models';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SectionTitle,
} from '../../components/molecules';
import { useSearchedItems } from '../../hooks/';
import { AuthContext } from '../../store';
import { itemServices } from '../../services';
import classes from './edit-user-items.module.css';

export const EditUserItems: FC = () => {
  const { loginUser, setLoginUser } = useContext(AuthContext);
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();
  const [itemSearchInput, setItemSearchInput] = useState('');
  const changeItemSearchInputHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setItemSearchInput(event.target.value);
  };

  const addClickHandler = (item: ItemType) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };

      if (!newUser.items) {
        return;
      }

      newUser.items.push(item);
      setLoginUser(newUser);

      // update db
      itemServices.addUserItem(loginUser!.id, item.id);
    }
  };

  const deleteClickHandler = (itemId: string) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      newUser.items = newUser.items?.filter((item) => item.id !== itemId);
      setLoginUser(newUser);

      // update db data
      itemServices.deleteUserItem(loginUser!.id, itemId);
    }
  };

  return (
    <Fragment>
      <SectionTitle>Your items</SectionTitle>
      {loginUser && loginUser.items && loginUser.items.length > 0 ? (
        <RegisteredItems
          items={loginUser.items}
          onDeleteRegisteredItem={deleteClickHandler}
        />
      ) : (
        <NotFoundMessage title="No Item Found" text="Please register items" />
      )}
      <section className={classes['search-bar']}>
        <SectionTitle>Add new items</SectionTitle>
        <SearchBar
          value={itemSearchInput}
          onChange={changeItemSearchInputHandler}
          placeholder={'Search item'}
          onSetIsSearched={updateIsItemSearchedHandler}
          onSetSearchResult={updateSearchedItemsHandler}
        />
        <Link to="/" className={classes['new-item-link']}>
          Create New Item
        </Link>
      </section>
      {loginUser && (
        <section>
          <SearchedItems
            searchItemInput={itemSearchInput}
            items={searchedItems}
            registeredItems={loginUser.items ? loginUser.items : []}
            isItemSearched={isItemSearched}
            onAddClick={addClickHandler}
          />
        </section>
      )}
    </Fragment>
  );
};
