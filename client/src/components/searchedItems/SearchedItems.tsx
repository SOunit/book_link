import Item from '../../models/Item';
import SearchedItem from './SearchedItem';
import { Fragment } from 'react';

type SearchdItemsProps = {
  items: Item[];
  isItemSearched: boolean;
  onAddRegisteredItem: (item: Item) => void;
};

const SearchedItems: React.FC<SearchdItemsProps> = (props) => {
  let dispItems = props.items.map((item) => {
    return (
      <SearchedItem
        key={item.id}
        item={item}
        onAddRegisteredItem={props.onAddRegisteredItem}
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
