import { ChangeEvent, FormEvent, useState } from 'react';
import Item from '../../models/Item';
import classes from './SearchBar.module.css';

const DUMMY_DATA: Item[] | [] = [
  new Item('title1', 'author1'),
  new Item('title2', 'author2'),
  new Item('title3', 'author3'),
];

const SearchBar: React.FC<{
  placeholder: string;
  onUpdateSearchedItems: (searchedItems: Item[]) => void;
  onUpdateIsItemSearched: () => void;
}> = (props) => {
  const [enteredText, setEnteredText] = useState('');

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log('submit!');

    // FIXME
    // http request
    props.onUpdateSearchedItems(DUMMY_DATA);
    props.onUpdateIsItemSearched();
  };

  return (
    <form onSubmit={submitHandler} className={classes['search-bar']}>
      <input
        type='text'
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
