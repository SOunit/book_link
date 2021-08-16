import { Fragment } from 'react';
import SearchedItems from '../components/searchedItems/SearchedItems';
import SearchBar from '../components/ui/SearchBar';
import classes from './SearchUsers.module.css';

const SearchUsers = () => {
  return (
    <Fragment>
      <section className={classes['serach-bar']}>
        <SearchBar placeholder={'Search book'} />
      </section>
      <section>
        <SearchedItems />
      </section>
    </Fragment>
  );
};

export default SearchUsers;
