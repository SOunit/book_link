import { Fragment } from 'react';
import { Buttons, NotFoundMessage, SearchItemCard } from '..';
import { Item } from '../../../models';
import { IconButton } from '../../atoms';

type SearchedItemsProps = {
  items: Item[];
  registeredItems: Item[];
  isItemSearched: boolean;
  onAddClick: (item: Item) => void;
};

export const SearchedItems: React.FC<SearchedItemsProps> = (props) => {
  const createButtons = (item: Item) => {
    const buttonDisabled = props.registeredItems.some(
      (elem) => elem.id === item.id,
    );

    const buttons = (
      <Buttons>
        {!buttonDisabled && (
          <IconButton
            iconName="fa fa-plus"
            onClick={() => props.onAddClick(item)}
          />
        )}
      </Buttons>
    );

    return buttons;
  };

  let searchItemCardList: any = props.items.map((item) => {
    const buttons = createButtons(item);
    return <SearchItemCard key={item.id} item={item} actions={buttons} />;
  });

  if (
    (!searchItemCardList || searchItemCardList.length === 0) &&
    props.isItemSearched
  ) {
    searchItemCardList = (
      <NotFoundMessage
        title="Item not found!"
        text="Please search by another keyword."
      />
    );
  }

  return <Fragment>{searchItemCardList}</Fragment>;
};
