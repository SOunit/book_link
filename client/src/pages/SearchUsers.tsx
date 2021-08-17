import { Fragment, useState } from 'react';
import Item from './../models/Item';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar';
import classes from './SearchUsers.module.css';

const SearchUsers = () => {
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [isItemSearched, setIsItemSearched] = useState(false);

  const updateSearchedItemsHandler = (searchedItems: Item[]) => {
    setSearchedItems(searchedItems);
  };

  const updateIsItemSearchedHandler = () => {
    setIsItemSearched(true);
  };

  return (
    <Fragment>
      <section className={classes['serach-bar']}>
        <SearchBar
          placeholder={'Search book'}
          onUpdateIsItemSearched={updateIsItemSearchedHandler}
          onUpdateSearchedItems={updateSearchedItemsHandler}
        />
      </section>
      <section>
        <SearchedItems items={searchedItems} isItemSearched={isItemSearched} />
      </section>
    </Fragment>
  );
};

export default SearchUsers;
