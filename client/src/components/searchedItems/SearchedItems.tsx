import Item from '../../models/Item';
import SearchedItem from './SearchedItem';
import { Fragment } from 'react';

const SearchedItems: React.FC<{ items: Item[]; isItemSearched: boolean }> = (
  props
) => {
  let dispItems = props.items.map((item) => {
    return (
      <SearchedItem
        key={item.id}
        title={item.title}
        id={item.id}
        author={item.author}
        imageUrl={item.imageUrl}
      />
    );
  });

  return (
    <Fragment>
      {dispItems}
      {(!dispItems || dispItems.length === 0) && props.isItemSearched && (
        <p>Item not found!</p>
      )}
    </Fragment>
  );
};

export default SearchedItems;
