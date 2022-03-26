import { FormEvent } from 'react';
import { Item } from '../../../../domain/';
import { itemServices } from '../../../../services';
import classes from './search-bar.module.scss';

type Props = {
  value: string;
  placeholder: string;
  onSetSearchResult: (searchedItems: Item[]) => void;
  onSetIsSearched: () => void;
  onChange: any;
};

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  onSetSearchResult,
  onSetIsSearched,
}) => {
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (value.length < 1) {
      onSetSearchResult([]);
      onSetIsSearched();
      return;
    }

    itemServices.fetchItemsByTitle(value).then((result) => {
      onSetSearchResult(result.data.data.itemsByTitle);
      onSetIsSearched();
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes['search-bar']}>
      <input
        type="text"
        className={classes['search-bar__input']}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i className={`fas fa-search ${classes['search-bar__icon']}`}></i>
    </form>
  );
};
