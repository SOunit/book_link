import Item from '../../models/Item';
import classes from './SearchedItem.module.css';
import Button from '../ui/Button';

type SearchdItemProps = {
  item: Item;
  onAddRegisteredItem: (item: Item) => void;
};

const SearchedItem: React.FC<SearchdItemProps> = (props) => {
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
    <div className={classes['searched-item']}>
      <div className={classes['image-container']}>{imageTag}</div>
      <div className={classes['searched-item__details']}>
        <div className={classes['searched-item__title']}>
          {props.item.title}
        </div>
        <div className={classes['searched-item__author']}>
          {props.item.author}
        </div>
        <div className={classes['button-container']}>
          <Button
            buttonText={'add'}
            onButtonClick={() => props.onAddRegisteredItem(props.item)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
