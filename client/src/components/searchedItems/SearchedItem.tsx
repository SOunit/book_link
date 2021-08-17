import Item from '../../models/Item';
import classes from './SearchedItem.module.css';

const SearchedItem: React.FC<Item> = (props) => {
  return (
    <div className={classes['searched-item']}>
      <div className={classes['image-container']}>
        <div className={classes['image']}>Image</div>
      </div>
      <div className={classes['searched-item__details']}>
        <div className={classes['searched-item__title']}>{props.title}</div>
        <div className={classes['searched-item__author']}>{props.author}</div>
      </div>
    </div>
  );
};

export default SearchedItem;
