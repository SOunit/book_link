import { FC, Fragment } from 'react';
import { Item } from '../../../models';
import classes from './item-card-details.module.css';

type ItemCardProps = {
  item: Item;
  buttons: any;
};

export const ItemCardDetails: FC<ItemCardProps> = (props) => {
  return (
    <Fragment>
      <div className={classes['item-card__title']}>{props.item.title}</div>
      <div className={classes['item-card__author']}>{props.item.author}</div>
      {props.buttons}
    </Fragment>
  );
};
