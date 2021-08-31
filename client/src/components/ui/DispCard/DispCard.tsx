import classes from './DispCard.module.css';

type DispCardProps = {
  imageUrl: string;
  imageName: string;
};

const DipsCard: React.FC<DispCardProps> = (props) => {
  let imageTag = <div className={classes['image']}>No Image</div>;
  if (props.imageUrl) {
    imageTag = (
      <img
        className={classes['image']}
        src={props.imageUrl}
        alt={props.imageName}
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
