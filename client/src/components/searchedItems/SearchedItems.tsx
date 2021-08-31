import Item from '../../models/Item';
import ItemCard from '../ui/DispCard/ItemCard';
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
      <ItemCard
        key={item.id}
        item={item}
        buttonText='add'
        onButtonClick={props.onAddRegisteredItem}
        buttonDisabled={buttonDisabled}
        isDeleteButton={false}
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
