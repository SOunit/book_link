import { Fragment } from 'react';
import Item from '../../models/Item';
import DispCard from '../ui/DispCard/DispCard';
import ItemCardDetail from '../ui/DispCard/ItemCardDetails';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';

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
          buttonType={
            buttonDisabled ? ButtonTypes.IN_ACTIVE : ButtonTypes.NORMAL
          }
        />
      </Buttons>
    );

    return buttons;
  };

  let dispItems: any = props.items.map((item) => {
    const buttons = createButtons(item);
    return (
      <DispCard key={item.id} imageUrl={item.imageUrl} imageName={item.title}>
        <ItemCardDetail item={item} buttons={buttons} />
      </DispCard>
    );
  });

  if ((!dispItems || dispItems.length === 0) && props.isItemSearched) {
    dispItems = <p>Item not found!</p>;
  }

  return <Fragment>{dispItems}</Fragment>;
};

export default SearchedItems;
