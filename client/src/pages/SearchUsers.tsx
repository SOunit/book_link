import { Fragment, useState } from 'react';
import Item from './../models/Item';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar';
import classes from './SearchUsers.module.css';
import RegisteredItems from '../components/registeredItems/RegisteredItems';

const SearchUsers = () => {
  const [searchedItems, setSearchedItems] = useState<Item[]>([]);
  const [isItemSearched, setIsItemSearched] = useState(false);
  const [registeredItems, setRegisteredItems] = useState<Item[]>([]);

  const updateSearchedItemsHandler = (searchedItems: Item[]) => {
    setSearchedItems(searchedItems);
  };

  const updateIsItemSearchedHandler = () => {
    setIsItemSearched(true);
  };

  const deleteRegisteredItemHandler = () => {
    console.log('delete registered item');
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
        <SearchedItems
          items={searchedItems}
          registeredItems={registeredItems}
          isItemSearched={isItemSearched}
          onAddRegisteredItem={addRegisteredItemHandler}
        />
      </section>
      <section>
        <RegisteredItems />
      </section>
    </Fragment>
  );
};

export default SearchUsers;
