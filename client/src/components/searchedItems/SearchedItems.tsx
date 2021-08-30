import Item from '../../models/Item';
import SearchedItem from './SearchedItem';
import { Fragment } from 'react';

type SearchdItemsProps = {
  items: Item[];
  registeredItems: Item[];
  isItemSearched: boolean;
  onAddRegisteredItem: (item: Item) => void;
};

const SearchedItems: React.FC<SearchdItemsProps> = (props) => {
  const dispItems = props.items.map((item) => {
    const buttonDisabled = props.registeredItems.some(
      (elem) => elem.id === item.id
    );
    return (
      <SearchedItem
        key={item.id}
        item={item}
        onAddRegisteredItem={props.onAddRegisteredItem}
        buttonDisabled={buttonDisabled}
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
