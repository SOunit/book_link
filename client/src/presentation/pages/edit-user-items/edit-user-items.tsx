import { ChangeEvent, FC, Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../../domain/';
import {
  NotFoundMessage,
  RegisteredItems,
  SearchBar,
  SearchedItems,
  SectionTitle,
} from '../../components/molecules';
import { useSearchedItems } from '../../../application/hooks';
import { AuthContext } from '../../../services/store';
import classes from './edit-user-items.module.scss';
import { useUpdateUserItems } from '../../../application/user/update-user-items';
import { User } from '../../../domain';

export const EditUserItems: FC = () => {
  const { loginUser } = useContext(AuthContext);
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
  const { addUserItem, removeUserItem } = useUpdateUserItems();

  const addClickHandler = (item: Item) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      if (!newUser.items) {
        return;
      }
      newUser.items.push(item);

      addUserItem(newUser, item.id);
    }
  };

  const deleteClickHandler = (itemId: string) => {
    if (loginUser) {
      // update user state
      const newUser: User = { ...loginUser };
      newUser.items = newUser.items!.filter((item) => item.id !== itemId);

      removeUserItem(newUser, itemId);
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
        <Link to="/items/new" className={classes['new-item-link']}>
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
