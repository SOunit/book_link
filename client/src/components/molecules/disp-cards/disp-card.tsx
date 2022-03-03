import classes from './disp-card.module.css';

type DispCardProps = {
  imageUrl: string;
  imageName: string;
};

export const DispCard: React.FC<DispCardProps> = (props) => {
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
