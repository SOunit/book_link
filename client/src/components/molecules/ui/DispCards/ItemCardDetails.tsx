import classes from './ItemCardDetails.module.css';
import { FC, Fragment } from 'react';
import Item from '../../../../models/Item';

type ItemCardProps = {
  item: Item;
  buttons: any;
};

const ItemCardDetails: FC<ItemCardProps> = (props) => {
  return (
    <Fragment>
      <div className={classes['item-card__title']}>{props.item.title}</div>
      <div className={classes['item-card__author']}>{props.item.author}</div>
      {props.buttons}
    </Fragment>
  );
};

export default ItemCardDetails;
