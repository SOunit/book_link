import { Fragment } from 'react';
import Item from '../../models/Item';
import DispCard from '../ui/DispCard/DispCard';
import ItemCardDetail from '../ui/DispCard/ItemCardDetails';
import Buttons from '../ui/Buttons/Buttons';
import Button from '../ui/Buttons/Button';

type SearchdItemsProps = {
  items: Item[];
  registeredItems: Item[];
  isItemSearched: boolean;
  onAddRegisteredItem: (item: Item) => void;
};

const SearchedItems: React.FC<SearchdItemsProps> = (props) => {
  const createButtons = (item: Item) => {
    const buttonDisabled = props.registeredItems.some(
      (elem) => elem.id === item.id
    );
    const buttons = (
      <Buttons>
        <Button
          buttonText='add'
          onButtonClick={() => props.onAddRegisteredItem(item)}
          disabled={buttonDisabled}
          isDeleteButton={false}
        />
      </Buttons>
    );

    return buttons;
  };

  const dispItems = props.items.map((item) => {
    const buttons = createButtons(item);
    return (
      <DispCard key={item.id} item={item}>
        <ItemCardDetail item={item} buttons={buttons} />
      </DispCard>
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
