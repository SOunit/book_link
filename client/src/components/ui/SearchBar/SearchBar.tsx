import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import Item from '../../../models/Item';
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

    const graphqlQuery = {
      query: `
              query fetchItems ($title: String){
                itemsByTitle(title: $title){
                  id
                  title
                  author
                  imageUrl
                }
              }
            `,
      variables: {
        title: enteredText,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'POST',
      data: graphqlQuery,
    });

    props.onSetSearchResult(result.data.data.itemsByTitle);
    props.onSetIsSearched();
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
