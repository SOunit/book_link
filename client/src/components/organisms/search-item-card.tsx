import { FC } from 'react';
import Item from '../../models/Item';
import Image from '../atoms/image';
import classes from './search-item-card.module.css';

type Props = {
  item: Item;
  actions?: any;
};

const SearchItemCard: FC<Props> = ({ item, actions }) => {
  return (
    <div className={classes['search-item-card']}>
      <div className={classes['search-item-card__item-info']}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          className={classes['search-item-card__image']}
        />
        <h2 className={classes['search-item-card__title']}>{item.title}</h2>
      </div>
      <div>{actions}</div>
    </div>
  );
};

export default SearchItemCard;
