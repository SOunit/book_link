import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisteredItems from '../components/registeredItems/RegisteredItems';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';
import useSearchedItems from '../hooks/use-searched-items';
import useLoginUser from '../hooks/use-login-user';
import SearchBar from '../components/ui/SearchBar/SearchBar';
import classes from './EditUserItems.module.css';
import SearchedItems from '../components/searchedItems/SearchedItems';
import ItemType from '../models/Item';
import services from '../services/services';

const EditUserItems: FC = () => {
  const { loginUser, setLoginUser } = useLoginUser();
  const {
    searchedItems,
    isItemSearched,
    updateSearchedItemsHandler,
    updateIsItemSearchedHandler,
  } = useSearchedItems();

  const addClickHandler = (item: ItemType) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      newUser.items.push(item);
      setLoginUser(newUser);

      // update db
      services.addUserItem(loginUser!.id, item.id);
    }
  };

  const deleteClickHandler = (itemId: string) => {
    if (loginUser) {
      // update user state
      const newUser = { ...loginUser };
      newUser.items = newUser.items?.filter((item) => item.id !== itemId);
      setLoginUser(newUser);

      // update db data
      services.deleteUserItem(loginUser!.id, itemId);
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
