import { FC } from 'react';
import { Item as ItemType } from '../../../models';
import { Image } from '../../atoms';
import classes from './user-items.module.css';

type UserItemsProps = {
  items: ItemType[];
};

export const UserItems: FC<UserItemsProps> = (props) => {
  let itemList: any[] = [];

  if (props.items.length > 0) {
    props.items.map((item) =>
      itemList.push(
        <div key={item.id} className={classes['user-item']}>
          <Image
            src={item.imageUrl}
            alt={item.title}
            imageStyle={classes['user-item__image']}
          />
        </div>,
      ),
    );
  }

  return <div className={classes['user-items']}>{itemList}</div>;
};
