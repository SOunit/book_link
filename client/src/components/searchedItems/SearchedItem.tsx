import Item from '../../models/Item';
import classes from './SearchedItem.module.css';

const SearchedItem: React.FC<Item> = (props) => {
  let imageTag = <div className={classes['image']}>No Image</div>;
  if (props.imageUrl) {
    imageTag = (
      <img
        className={classes['image']}
        src={props.imageUrl}
        alt={props.title}
      />
    );
  }

  return (
    <div className={classes['searched-item']}>
      <div className={classes['image-container']}>{imageTag}</div>
      <div className={classes['searched-item__details']}>
        <div className={classes['searched-item__title']}>{props.title}</div>
        <div className={classes['searched-item__author']}>{props.author}</div>
      </div>
    </div>
  );
};

export default SearchedItem;
