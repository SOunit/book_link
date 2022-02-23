import { Fragment } from 'react';
import Item from '../../models/Item';
import Buttons from '../ui/Buttons/Buttons';
import classes from './SearchedItems.module.css';
import SearchItemCard from '../organisms/search-item-card';
import IconButton from '../atoms/icon-button';

type SearchedItemsProps = {
  items: Item[];
  registeredItems: Item[];
  isItemSearched: boolean;
  onAddClick: (item: Item) => void;
};

const SearchedItems: React.FC<SearchedItemsProps> = (props) => {
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
    searchItemCardList = <p className={classes['message']}>Item not found!</p>;
  }

  return <Fragment>{searchItemCardList}</Fragment>;
};

export default SearchedItems;
