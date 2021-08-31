import { FC, Fragment } from 'react';
import Item from '../../models/Item';
import ItemCard from '../ui/DispCard/ItemCard';

type RegisteredItemsProps = {
  items: Item[];
  onDeleteRegistedItem: any;
};

const RegisteredItems: FC<RegisteredItemsProps> = (props) => {
  const items = props.items.map((el) => (
    <ItemCard
      item={el}
      key={el.id}
      buttonText='Delete'
      buttonDisabled={false}
      onButtonClick={() => props.onDeleteRegistedItem(el.id)}
      isDeleteButton={true}
    />
  ));
  return <Fragment>{items}</Fragment>;
};

export default RegisteredItems;
