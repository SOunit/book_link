import Item from '../../../models/Item';
import classes from './DispCard.module.css';

type DispCardProps = {
  item: Item;
};

const DipsCard: React.FC<DispCardProps> = (props) => {
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
    <div className={classes['disp-card']}>
      <div className={classes['image-container']}>{imageTag}</div>
      <div className={classes['disp-card__details']}>{props.children}</div>
    </div>
  );
};

export default DipsCard;
