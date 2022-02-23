import { FC } from 'react';
import classes from './image.module.css';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const Image: FC<Props> = ({ src, alt, className }) => {
  return (
    <div className={`${classes['image-container']} ${className}`}>
      <img className={classes['image']} src={src} alt={alt} />
    </div>
  );
};

export default Image;
