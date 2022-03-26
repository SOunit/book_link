import { FormEvent } from 'react';
import { Item } from '../../../../domain/';
import { useItemAdapter } from '../../../../services';
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
  const itemAdapter = useItemAdapter();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (value.length < 1) {
      onSetSearchResult([]);
      onSetIsSearched();
      return;
    }

    itemAdapter.fetchItemsByTitle(value).then((result) => {
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
