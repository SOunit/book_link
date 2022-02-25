import { FC } from 'react';
import ItemType from '../../../models/Item';
import ImageContainer from '../ui/ImageContainer/ImageContainer';
import classes from './UserItems.module.css';

type UserItemsProps = {
  items: ItemType[];
};

const UserItems: FC<UserItemsProps> = (props) => {
  let itemList: any[] = [];

  if (props.items.length > 0) {
    props.items.map((item) =>
      itemList.push(
        <div key={item.id} className={classes['user-item']}>
          <ImageContainer src={item.imageUrl} alt={item.title} />
        </div>,
      ),
    );
  }

  return <div className={classes['user-items']}>{itemList}</div>;
};

export default UserItems;
