import { ChangeEvent, FormEvent, useState } from 'react';
import Item from '../../../models/Item';
import services from '../../../services/itemServices';
import classes from './SearchBar.module.css';

const SearchBar: React.FC<{
  placeholder: string;
  onSetSearchResult: (searchedItems: Item[]) => void;
  onSetIsSearched: () => void;
}> = (props) => {
  const [enteredText, setEnteredText] = useState('');

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (enteredText.length < 1) {
      props.onSetSearchResult([]);
      props.onSetIsSearched();
      return;
    }

    services.fetchItemsByTitle(enteredText).then((result) => {
      props.onSetSearchResult(result.data.data.itemsByTitle);
      props.onSetIsSearched();
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes['search-bar']}>
      <input
        type="text"
        className={classes['search-bar__input']}
        placeholder={props.placeholder}
        value={enteredText}
        onChange={changeInputHandler}
      />
      <i className={`fas fa-search ${classes['search-bar__icon']}`}></i>
    </form>
  );
};

export default SearchBar;
