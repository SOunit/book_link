import { FC, Fragment } from 'react';
import Item from '../../models/Item';
import ItemCard from '../ui/DispCard/DispCard';
import ItemCardDetail from '../ui/DispCard/ItemCardDetails';
import Buttons from '../ui/Buttons/Buttons';
import Button, { ButtonTypes } from '../ui/Buttons/Button';

type RegisteredItemsProps = {
  items: Item[];
  onDeleteRegistedItem: any;
};

const RegisteredItems: FC<RegisteredItemsProps> = (props) => {
  const createButtons = (item: Item) => {
    const buttons = (
      <Buttons>
        <Button
          buttonText='Delete'
          buttonType={ButtonTypes.DELETE}
          onButtonClick={() => props.onDeleteRegistedItem(item.id)}
        />
      </Buttons>
    );

    return buttons;
  };

  const items = props.items.map((el) => {
    const buttons = createButtons(el);

    return (
      <ItemCard imageUrl={el.imageUrl} imageName={el.title} key={el.id}>
        <ItemCardDetail item={el} buttons={buttons} />
      </ItemCard>
    );
  });
  return <Fragment>{items}</Fragment>;
};

export default RegisteredItems;
