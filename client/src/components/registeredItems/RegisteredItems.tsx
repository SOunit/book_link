import { FC } from 'react';
import Item from '../../models/Item';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';
import ItemCard from '../organisms/Item-card';
import classes from './RegisteredItems.module.css';
import IconButton from '../atoms/icon-button';

type RegisteredItemsProps = {
  items: Item[];
  onDeleteRegisteredItem: any;
};

const RegisteredItems: FC<RegisteredItemsProps> = (props) => {
  const createButtons = (item: Item) => {
    const buttons = (
      <Buttons>
        <IconButton
          iconName="fas fa-trash"
          onClick={() => props.onDeleteRegisteredItem(item.id)}
        />
      </Buttons>
    );

    return buttons;
  };

  const items = props.items.map((item) => {
    const buttons = createButtons(item);

    return (
      <ItemCard
        key={item.id}
        item={item}
        className={classes[`registered-item`]}
        actions={buttons}
      />
    );
  });

  return <div className={classes['registered-items']}>{items}</div>;
};

export default RegisteredItems;
