import SearchBar from '../components/ui/SearchBar';
import classes from './SearchUsers.module.css';

const SearchUsers = () => {
  return (
    <section className={classes['serach-bar']}>
      <SearchBar placeholder={'Search book'} />
    </section>
  );
};

export default SearchUsers;
