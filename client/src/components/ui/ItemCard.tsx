import Item from '../../models/Item';
import classes from './ItemCard.module.css';
import Button from '../ui/Button';

type ItemCardProps = {
  item: Item;
  buttonText: string;
  // FIXME: any
  onButtonClick: any;
  // FIXME: be able to set conditionally?
  buttonDisabled: boolean;
};

const SearchedItem: React.FC<ItemCardProps> = (props) => {
  let imageTag = <div className={classes['image']}>No Image</div>;
  if (props.item.imageUrl) {
    imageTag = (
      <img
        className={classes['image']}
        src={props.item.imageUrl}
        alt={props.item.title}
      />
    );
  }

  return (
    <div className={classes['item-card']}>
      <div className={classes['image-container']}>{imageTag}</div>
      <div className={classes['item-card__details']}>
        <div className={classes['item-card__title']}>{props.item.title}</div>
        <div className={classes['item-card__author']}>{props.item.author}</div>
        <div className={classes['button-container']}>
          <Button
            buttonText={props.buttonText}
            onButtonClick={() => props.onButtonClick(props.item)}
            disabled={props.buttonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
