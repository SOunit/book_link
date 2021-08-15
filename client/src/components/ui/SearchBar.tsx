import { ChangeEvent, FormEvent, useState } from 'react';
import classes from './SearchBar.module.css';

const SearchBar: React.FC<{ placeholder: string }> = (props) => {
  const [enteredText, setEnteredText] = useState('');

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
  };

  return (
    <div className={classes['search-bar']}>
      <input
        type='text'
        className={classes['search-bar__input']}
        placeholder={props.placeholder}
        value={enteredText}
        onChange={changeInputHandler}
      />
      <i className={`fas fa-search ${classes['search-bar__icon']}`}></i>
    </div>
  );
};

export default SearchBar;
